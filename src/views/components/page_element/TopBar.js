import {FormikProvider, useFormik} from "formik";
import TextField from "@mui/material/TextField";
import {Divider, IconButton} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import {useDispatch, useSelector} from "react-redux";
import {useStyles} from "../../../factory/StyleFactory";
import {weatherViewStyle} from "../../style/WeatherViewStyle";
import * as yup from "yup";
import {weatherAction} from "../../../redux/action/weatherAction";
import {useEffect, useState} from "react";
import SnackbarAlert from "../SnackbarAlert";

const validationSchema = yup.object({
    city: yup.string("Location is required").required("Location is required"),
});

function TopBar() {
    const dispatch = useDispatch();
    const classes = useStyles(weatherViewStyle);
    const weatherToday = useSelector(state => state.weather.weatherToday);
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const initialValues = {
        city: ''
    }

    useEffect(() => {
        searchWeatherForCity('Skopje')
    }, []);

    const searchWeatherForCity = (city) => {
        dispatch(weatherAction.getWeatherToday(city, success => {
            if (!success) {
                setSnackbarMessage({
                    message: 'Location not found!',
                    subMessage: 'Please enter valid city name.',
                    status: 'info'
                })
                setSnackbarStatus(true);
            }
        }));
        dispatch(weatherAction.getWeatherForecast(city));
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            searchWeatherForCity(values.city)
            formik.setTouched({
                ...values,
                city: false
            })
            formik.setValues({
                ...values,
                city: '',
            })
        }
    });

    const searchWeatherForCityByCoords = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(weatherAction.getWeatherTodayByCoords(position.coords.latitude, position.coords.longitude));
                dispatch(weatherAction.getWeatherForecastByCoords(position.coords.latitude, position.coords.longitude));
            },
            (error) => {
                setSnackbarMessage({
                    message: error.message + '!',
                    subMessage: 'Please enable location to use this feature.',
                    status: 'info'
                })
                setSnackbarStatus(true);
            });
    }

    return (
        <>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={'row p-3 mt-1'}>
                        <div className={`col-4 ${classes.fontMain} text-start p-0`}>
                            <b style={{
                                fontSize: '27px',
                                color: 'rgb(64,93,159)'
                            }}>
                                {monthNames [new Date((weatherToday?.dt * 1000) + (weatherToday?.timezone * 1000)).getUTCMonth()] + " " }
                                {new Date((weatherToday?.dt * 1000) + (weatherToday?.timezone * 1000)).getUTCFullYear()}
                            </b>
                            <br/>
                            <span style={{
                                fontSize: '17px',
                                color: 'rgb(155,154,158)'
                            }}>
                                {new Date((weatherToday?.dt * 1000) + (weatherToday?.timezone * 1000)).toLocaleDateString('en-US', {weekday: 'long',})},
                                {" " + monthNamesShort [new Date((weatherToday?.dt * 1000) + (weatherToday?.timezone * 1000)).getUTCMonth()]}
                                {new Date((weatherToday?.dt * 1000) + (weatherToday?.timezone * 1000)).getUTCDate()},
                                {" " + new Date((weatherToday?.dt * 1000) + (weatherToday?.timezone * 1000)).getUTCFullYear()}
                            </span>
                        </div>

                        <div className={'col-5'}>
                            <div className={'row d-flex justify-content-end mt-2'}>
                                <div className={'col-9'}>
                                    <TextField id="city"
                                               name="city"
                                               sx={{input: {color: '#888888'}}}
                                               className={classes.inputField}
                                               autoCorrect={'false'}
                                               label={(formik.touched.city && Boolean(formik.errors.city)) ? formik.errors.city : " Search location here "}
                                               value={formik.values.city}
                                               onChange={formik.handleChange}
                                               fullWidth={true}/>
                                </div>
                                <div className={`col-3 d-flex justify-content-center ${classes.greyBorderHover}`}
                                     style={{
                                         backgroundColor: 'rgba(44,67,116, .07)',
                                         width: '60px',
                                         borderRadius: '10px',
                                         borderBottom: '3px solid rgba(44,67,116, .15)'
                                     }}>
                                    <IconButton size={'medium'} style={{margin: 'auto'}} type={"submit"}>
                                        <SearchRoundedIcon fontSize={'medium'} sx={{color: 'rgb(64,93,159)'}}/>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                        <div className={'col-3'}>
                            <div className={'row d-flex justify-content-end mt-2'}>
                                <div className={`d-flex justify-content-center ${classes.greyBorderHover}`}
                                     style={{
                                        backgroundColor: 'rgba(44,67,116, .07)',
                                        width: '60px',
                                        borderRadius: '10px',
                                        borderBottom: '3px solid rgba(44,67,116, .15)',
                                        height: '60px'
                                }}>
                                    <IconButton size={'medium'} style={{margin: 'auto'}}
                                                onClick={() => searchWeatherForCityByCoords()}>
                                        <LocationOnRoundedIcon fontSize={'medium'} sx={{color: 'rgb(64,93,159)'}}/>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </FormikProvider>
            <Divider sx={{backgroundColor: 'rgba(44,67,116, .4)'}}
                     style={{marginLeft: '200px', marginRight: '200px', marginTop: '20px'}}/>
            <SnackbarAlert snackbarStatus={snackbarStatus}
                           closeSnackbar={() => setSnackbarStatus(false)}
                           snackbarMessage={snackbarMessage}/>
        </>
    )
}

export default TopBar;