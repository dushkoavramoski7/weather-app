import {useStyles} from "../factory/StyleFactory";
import {weatherViewStyle} from "./style/WeatherViewStyle";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {weatherAction} from "../redux/action/weatherAction";
import WeatherIcon from "./components/WeatherIcon";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {Divider, IconButton, styled} from "@mui/material";
import sunrise from "../img/sunrise.png"
import sunset from "../img/sunset.png"
import visibility from "../img/low-visibility.png"
import windDirection from "../img/wind-direction.png"
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import {FormikProvider, useFormik} from "formik";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SnackbarAlert from "./components/SnackbarAlert";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LineChart from "./components/LineChart";
import WeatherToday from "./components/WeatherToday";
import WeatherWeek from "./components/WeatherWeek";


const validationSchema = yup.object({
    city: yup.string("Location is required").required("Location is required"),
});
function WeatherView() {
    const dispatch = useDispatch();
    const classes = useStyles(weatherViewStyle);
    const weatherToday = useSelector(state => state.weather.weatherToday);
    const weatherForecast = useSelector(state => state.weather.weatherForecast);
    const averageTempWeek = useSelector(state => state.weather.averageTempWeek);
    const weatherDetails = useSelector(state => state.weather.weatherDetails);
    const city = useSelector(state => state.weather.city);
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [weatherTodayActive, setWeatherTodayActive] = useState(true);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const initialValues = {
        city: ''
    }

    const searchWeatherForCity = (city) => {
        dispatch(weatherAction.getWeatherToday(city, success => {
            if(!success)
            {
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

    useEffect(() => {
        searchWeatherForCity('Skopje')
    }, []);

    const setViewWeatherToday = (status) => {
        setWeatherTodayActive(status);
        if(status) {
            dispatch(weatherAction.setWeatherWeek());
        }
        else {
            dispatch(weatherAction.getWeatherDetails(averageTempWeek[0].day));
        }
    }

    const BorderLinearProgress = styled(LinearProgress)(() => ({
        height: 30,
        borderRadius: 15,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: 'rgb(140,178,251, .09)',
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 15,
            backgroundColor: 'rgb(140,178,251)',
        },
    }));

    function formatAMPMHours(date) {
        let hours = date.getUTCHours();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        return hours + ' '+ ampm;
    }

    function formatAMPMHoursAndMinutes(date) {
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        let ampm = hours >= 12 ? 'AM' : 'PM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
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

    return (
        <div style={{height: '100%',width:'100%', margin:0}} className={'row'}>
            <div className={'col-8'}>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={'row p-3 mt-1'}>
                            <div className={`col-4 ${classes.fontMain} text-start`} >
                                <b style={{fontSize: '27px', color:'rgb(44,67,116)'}}>{monthNames [new Date((weatherToday?.dt * 1000) + (weatherToday?.timezone * 1000)).getUTCMonth()]} {new Date((weatherToday?.dt * 1000) + (weatherToday?.timezone * 1000)).getUTCFullYear()}</b>
                                <br/>
                                <span style={{fontSize: '17px',color: 'rgb(155,154,158)'}}>{new Date((weatherToday?.dt * 1000) + (weatherToday?.timezone * 1000)).toLocaleDateString('en-US', {weekday: 'long',})}, {monthNamesShort [new Date((weatherToday?.dt * 1000) + (weatherToday?.timezone * 1000)).getUTCMonth()]} {new Date((weatherToday?.dt * 1000) + (weatherToday?.timezone * 1000)).getUTCDate()}, {new Date((weatherToday?.dt * 1000) + (weatherToday?.timezone * 1000)).getUTCFullYear()}</span>
                            </div>

                            <div className={'col-5'}>
                                <div className={'row d-flex justify-content-end mt-2'}>
                                    <div className={'col-9'}>
                                        <TextField id="city"
                                                   name="city"
                                                   sx={{ input: { color: '#888888' } }}
                                                   className={classes.inputField}
                                                   autoCorrect={'false'}
                                                   label= {(formik.touched.city && Boolean(formik.errors.city)) ? formik.errors.city :  " Search location here "}
                                                   value={formik.values.city}
                                                   onChange={formik.handleChange}
                                                   fullWidth={true}/>
                                    </div>
                                    <div className={`col-3 d-flex justify-content-center ${classes.greyBorderHover}`} style={{backgroundColor: 'rgba(44,67,116, .07)', width: '60px', borderRadius: '10px', borderBottom: '3px solid rgba(44,67,116, .15)'}}>
                                        <IconButton size={'medium'} style={{margin: 'auto'}} type={"submit"}>
                                            <SearchRoundedIcon fontSize={'medium'}  sx={{color: 'rgb(64,93,159)'}} />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            <div className={'col-3'}>
                                <div className={'row d-flex justify-content-end mt-2'} >
                                <div className={`d-flex justify-content-center ${classes.greyBorderHover}`} style={{backgroundColor: 'rgba(44,67,116, .07)', width: '60px', borderRadius: '10px', borderBottom: '3px solid rgba(44,67,116, .15)', height: '60px'}}>
                                    <IconButton size={'medium'} style={{margin: 'auto'}} onClick={() => searchWeatherForCityByCoords()}>
                                        <LocationOnRoundedIcon fontSize={'medium'}  sx={{color: 'rgb(64,93,159)'}} />
                                    </IconButton>
                                </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </FormikProvider>
                <Divider sx={{backgroundColor: 'rgba(44,67,116, .4)'}} style={{marginLeft: '200px', marginRight: '200px', marginTop: '20px'}}/>
                <div className={`row mt-2 p-3 ${classes.fontMain}`}>

                    {weatherTodayActive ?
                        <WeatherToday setActive={() => setViewWeatherToday(false)}/>:
                            <WeatherWeek setActive={() => setViewWeatherToday(true)}/> }

                    <div className={`row mt-4 p-3 ${classes.fontMain}`}>
                        <div style={{fontSize: '20px', color:'rgb(44,67,116)', fontWeight: 'bold', marginLeft: '13px'}} className={'mb-4'}>{weatherDetails.length !== 0 ? 'Temperature ' + weatherDetails[0]?.day + ', ' + weatherDetails[0]?.dayName : 'Week Temperature (Day)'}</div>
                        {(averageTempWeek && weatherDetails) &&
                                <LineChart data={weatherDetails.length !== 0 ? weatherDetails : averageTempWeek}/>
                        }
                    </div>
                </div>
            </div>

            {/*right sidebar*/}

            <div className={`col-4 ${classes.darkBlueGradient}`} >
                <div className={`row p-5 text-white ${classes.fontMain}`}>
                    <div className={'col-7'}>
                        <div style={{fontSize: '40px'}}>{city?.name}<span style={{fontSize: '20px'}}></span> </div>
                        <div style={{color: 'rgba(255, 255, 255, .5)'}}>{city?.country}, {city?.state}</div>
                    </div>
                    <div className={'col-5 position-relative'}>
                        <b className={'align-middle position-absolute text-center'} style={{top: '40%', right: 0}}>{formatAMPMHoursAndMinutes(new Date((new Date().getTime())+(weatherToday.timezone * 1000)))}</b>
                    </div>
                </div>
                <div className={`row p-5 text-white ${classes.fontMain}`} style={{marginTop: '-70px'}}>
                    <div className={'col-10'}>
                        <WeatherIcon weatherDesc={weatherToday?.weather?.[0]?.description}/>
                        <div style={{fontSize: '80px'}}>
                            <b>{Math.round(weatherToday?.main?.temp - 273.15)}</b> °C
                        </div>
                    </div>
                    <div className={'col-2 position-relative'}>
                        <b className={'align-middle position-absolute text-end'} style={{top: '45%', right: 0, fontSize: '22px', color: 'rgba(255, 255, 255, .5)', textTransform: 'capitalize'}}>{weatherToday?.weather?.[0]?.description}</b>
                    </div>
                </div>
                <hr style={{color: 'whitesmoke', height: '2px', marginTop: '-20px', marginRight: '90px', marginLeft: '90px'}}/>
                <div className={`row text-white ${classes.fontMain}`} style={{marginTop: '0px'}}>
                    <div className={'col-12'}>
                       <div className={'mb-3 '} style={{fontSize: '18px', marginLeft: '25px'}}>Chance of rain:</div>
                        {weatherForecast?.list && weatherForecast?.list.slice(0, 4).map((weather) => {
                            return (
                                <div className={'row mb-3'} key={weather?.dt}>
                                    <div className={'col-2 text-end mt-1'} style={{fontSize: '15px'}}>
                                        <b>{formatAMPMHours(new Date((weather?.dt * 1000) + (weatherForecast?.city?.timezone * 1000))).slice(0,2)}</b> {formatAMPMHours(new Date((weather?.dt * 1000) + (weatherForecast?.city?.timezone * 1000))).slice(2)}
                                    </div>
                                    <div className={'col-8'}>
                                        <BorderLinearProgress variant="determinate" value={weather?.pop * 100} />
                                    </div>
                                    <div className={'col-2 text-start mt-1'} style={{fontSize: '15px'}}>
                                        <b>{Math.round(weather?.pop * 100)}</b> %
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={`row mb-3 mt-5 text-white ${classes.fontMain}`} style={{marginTop: '15px'}}>
                    <div className={'mb-1'} style={{fontSize: '18px', paddingLeft: '36px'}}>Sunrise & Sunset:</div>
                    <div className={'d-flex justify-content-around'}>
                    <div className={'m-2'} style={{height: '110px', backgroundColor: 'rgb(140,178,251, .09)', width: '45%', borderRadius: '10px'}}>
                        <div className={'row'}>
                            <div className={'col-4'} style={{marginTop: '30px', paddingLeft: '30px'}}>
                                <img src={sunrise} alt={""} style={{width: '50px', height: '50px'}} />
                            </div>
                            <div className={'col-8 mt-3'}>
                                <div style={{color: 'rgba(255, 255, 255, .5)'}} className={'text-center'}>Sunrise</div>
                                <div style={{fontSize: '25px'}} className={'text-center'}>
                                    {formatAMPMHours(new Date((weatherToday?.sys?.sunrise * 1000) + (weatherToday?.timezone * 1000)))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'m-2'} style={{height: '110px', backgroundColor: 'rgb(140,178,251, .09)', width: '45%', borderRadius: '10px'}}>
                        <div className={'row'}>
                            <div className={'col-4'} style={{marginTop: '30px', paddingLeft: '10%'}}>
                                <img src={sunset} alt={""} style={{width: '50px', height: '50px'}} />
                            </div>
                            <div className={'col-8 mt-3'}>
                                <div style={{color: 'rgba(255, 255, 255, .5)'}} className={'text-center'}>Sunset</div>
                                <div style={{fontSize: '25px'}} className={'text-center'}>
                                    {formatAMPMHours(new Date((weatherToday?.sys?.sunset * 1000) + (weatherToday?.timezone * 1000)))}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className={`row mb-3 mt-5 text-white ${classes.fontMain}`} style={{marginTop: '15px'}}>
                    <div className={'mb-1'} style={{fontSize: '18px', paddingLeft: '36px'}}>Visibility & Wind Direction (degrees):</div>
                    <div className={'d-flex justify-content-around'}>
                        <div className={'m-2'} style={{height: '110px', backgroundColor: 'rgb(140,178,251, .09)', width: '45%', borderRadius: '10px'}}>
                            <div className={'row'}>
                                <div className={'col-4'} style={{marginTop: '30px', paddingLeft: '30px'}}>
                                    <img src={visibility} alt={""} style={{width: '50px', height: '50px'}} />
                                </div>
                                <div className={'col-8 mt-3'}>
                                    <div style={{color: 'rgba(255, 255, 255, .5)'}} className={'text-center'}>Visibility</div>
                                    <div style={{fontSize: '25px'}} className={'text-center'}>
                                        {Math.round(weatherToday?.visibility / 1000)} km
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'m-2'} style={{height: '110px', backgroundColor: 'rgb(140,178,251, .09)', width: '45%', borderRadius: '10px'}}>
                            <div className={'row'}>
                                <div className={'col-4'} style={{marginTop: '30px', paddingLeft: '10%'}}>
                                    <img src={windDirection} alt={""} style={{width: '50px', height: '50px'}} />
                                </div>
                                <div className={'col-8 mt-3'}>
                                    <div style={{color: 'rgba(255, 255, 255, .5)'}} className={'text-center'}>Wind Deg</div>
                                    <div style={{fontSize: '25px'}} className={'text-center'}>
                                        {weatherToday?.wind?.deg}°
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SnackbarAlert snackbarStatus={snackbarStatus}
                           closeSnackbar={() => setSnackbarStatus(false)}
                           snackbarMessage={snackbarMessage}/>
        </div>
    )
}
export default WeatherView;