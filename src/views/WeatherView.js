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
import wind from "../img/wind.png"
import warm from "../img/warm.png"
import humidity from "../img/humidity.png"
import pollution from "../img/atmospheric-pollution.png"
import visibility from "../img/low-visibility.png"
import windDirection from "../img/wind-direction.png"
import moon from "../img/moon.png"
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import {FormikProvider, useFormik} from "formik";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SnackbarAlert from "./components/SnackbarAlert";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LineChart from "./components/LineChart";


const validationSchema = yup.object({
    city: yup.string("Location is required").required("Location is required"),
});
function WeatherView() {
    const dispatch = useDispatch();
    const classes = useStyles(weatherViewStyle);
    const weatherToday = useSelector(state => state.weather.weatherToday);
    const weatherForecast = useSelector(state => state.weather.weatherForecast);
    const airPollution = useSelector(state => state.weather.airPollution);
    const averageTempWeek = useSelector(state => state.weather.averageTempWeek);
    const averageTempNightWeek = useSelector(state => state.weather.averageTempNightWeek);
    const city = useSelector(state => state.weather.city);
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const airPollutionQuality = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

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
                    <div style={{fontSize: '20px', color:'rgb(44,67,116)', fontWeight: 'bold', marginLeft: '13px'}}>Today overview</div>
                    <div className={'row d-flex justify-content-around mt-3'}>
                        <div className={` m-2 ${classes.cardsStyle}`} style={{width: '45%'}}>
                            <div className={'row'}  style={{height: '150px'}}>
                                <div className={'col-3 d-flex justify-content-center'}>
                                    <img src={wind} alt={""} style={{margin: 'auto', width: '60px', height: '60px'}} />
                                </div>
                                <div className={'col-9 mt-3'} >
                                    <div className={'d-flex justify-content-start'}>
                                        <div><div style={{color: '#A9A9A9'}} className={"mb-2 "}>Wind Speed</div>
                                            <span style={{color: 'rgb(44,67,116)', fontSize: '27px'}} className={"mt-4"}> <b style={{fontSize: '47px'}}>{weatherToday?.wind?.speed}</b> m/sec</span>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={`m-2 ${classes.cardsStyle}`} style={{width: '45%'}}>
                            <div className={'row'}  style={{height: '150px'}}>
                                <div className={'col-3 d-flex justify-content-center'}>
                                    <img src={warm} alt={""} style={{margin: 'auto', width: '60px', height: '60px'}} />
                                </div>
                                <div className={'col-9 mt-3'} >
                                    <div>
                                        <div><div style={{color: '#A9A9A9'}}>Temperature</div>
                                            <div className={'row mt-1'} style={{marginLeft: '6px'}}>
                                                <div className={'col-7 ml-1'} style={{color: 'rgb(44,67,116)', fontSize: '18px'}}> Feels like </div>
                                                <div className={'col-5'} style={{color: 'rgb(44,67,116)', fontWeight: 'bold', fontSize: '18px'}}>{Math.round(weatherToday?.main?.feels_like - 273.15)} °C</div>
                                            </div>
                                            <div className={'row'} style={{marginLeft: '6px'}}>
                                                <div className={'col-7'} style={{color: 'rgb(44,67,116)', fontSize: '18px'}}> Max <ArrowDropUpRoundedIcon fontSize={'medium'} sx={{color:'blue'}}/></div>
                                                <div className={'col-5'} style={{color: 'rgb(44,67,116)', fontWeight: 'bold', fontSize: '18px'}}>{Math.round(weatherToday?.main?.temp_max - 273.15)} °C</div>
                                            </div>
                                            <div className={'row'} style={{marginLeft: '6px'}}>
                                                <div className={'col-7'} style={{color: 'rgb(44,67,116)', fontSize: '18px'}}> Min <ArrowDropDownRoundedIcon fontSize={'medium'} sx={{color:'red'}}/></div>
                                                <div className={'col-5'} style={{color: 'rgb(44,67,116)', fontWeight: 'bold', fontSize: '18px'}}>{Math.round(weatherToday?.main?.temp_min - 273.15)} °C</div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>
                    <div className={'row d-flex justify-content-around mt-1'}>
                        <div className={`m-2 ${classes.cardsStyle}`} style={{width: '45%'}}>
                            <div className={'row'}  style={{height: '150px'}}>
                                <div className={'col-3 d-flex justify-content-center'}>
                                    <img src={humidity} alt={""} style={{margin: 'auto', width: '60px', height: '60px'}} />
                                </div>
                                <div className={'col-9 mt-3'} >
                                    <div>
                                        <div><div style={{color: '#A9A9A9'}} className={'mb-2'}>Humidity & Pressure</div>
                                            <span style={{color: 'rgb(44,67,116)', fontSize: '23px'}} className={"mt-4"}> <b style={{fontSize: '35px'}}>{weatherToday?.main?.humidity}</b> %</span>,
                                            <span style={{color: 'rgb(44,67,116)', fontSize: '23px'}} className={"mt-4"}> <b style={{fontSize: '31px'}}>{weatherToday?.main?.pressure}</b> hPa</span>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className={`m-2 ${classes.cardsStyle}`} style={{width: '45%'}}>
                            <div className={'row'}  style={{height: '150px'}}>
                                <div className={'col-3 d-flex justify-content-center'}>
                                    <img src={pollution} alt={""} style={{margin: 'auto', width: '60px', height: '60px'}} />
                                </div>
                                <div className={'col-9 mt-3'} >
                                    <div>
                                        <div><div style={{color: '#A9A9A9'}} className={'mb-1'}>Air Pollution ({airPollution?.list?.[0]?.main?.aqi } - <b>{airPollutionQuality[airPollution?.list?.[0]?.main?.aqi - 1]}</b>)</div>
                                            <div className={'row'}>
                                                <div className={'col-5'} style={{color: 'rgb(44,67,116)', fontSize: '14px'}}>CO (Carbon monoxide)</div>
                                                <div className={'col-7'} style={{color: 'rgb(44,67,116)', fontWeight: 'bold'}}>{Math.round(airPollution?.list?.[0]?.components?.co)} <span style={{ fontSize: '10px'}}>μg/m3</span></div>
                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-5'} style={{color: 'rgb(44,67,116)', fontSize: '14px'}}>PM10</div>
                                                <div className={'col-7'} style={{color: 'rgb(44,67,116)', fontWeight: 'bold', fontSize: '16px'}}>{Math.round(airPollution?.list?.[0]?.components?.pm10)} <span style={{ fontSize: '10px'}}>μg/m3</span></div>
                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-5'} style={{color: 'rgb(44,67,116)', fontSize: '14px'}}>PM2.5</div>
                                                <div className={'col-7'} style={{color: 'rgb(44,67,116)', fontWeight: 'bold', fontSize: '16px'}}>{Math.round(airPollution?.list?.[0]?.components?.pm2_5)} <span style={{ fontSize: '10px'}}>μg/m3</span></div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>

                    <div className={`row mt-4 p-3 ${classes.fontMain}`}>
                        <div style={{fontSize: '20px', color:'rgb(44,67,116)', fontWeight: 'bold', marginLeft: '13px'}} className={'mb-4'}>Average Week Temperature (Day)</div>
                        {averageTempWeek &&
                            <LineChart data={averageTempWeek}/>}
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
                <div className={`row mb-3 text-white ${classes.fontMain}`} style={{marginTop: '0px'}}>
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
                <div className={`row mb-3 text-white ${classes.fontMain}`} style={{marginTop: '0px'}}>
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
                <div className={`row mb-1 text-white ${classes.fontMain}`} style={{marginTop: '0px'}}>
                    <div className={'mb-1'} style={{fontSize: '18px', paddingLeft: '36px'}}>Temperature at night:</div>
                    <div className={'d-flex justify-content-around'}>
                        <div className={'m-2'} style={{height: '110px', backgroundColor: 'rgb(140,178,251, .09)', width: '65%', borderRadius: '10px'}}>
                            <div className={'row'}>
                                <div className={'col-3'} style={{marginTop: '30px', paddingLeft: '30px'}}>
                                    <img src={moon} alt={""} style={{width: '50px', height: '50px'}} />
                                </div>
                                <div className={'col-9 mt-2'}>
                                    {averageTempNightWeek && averageTempNightWeek.slice(0,3).map((temp) => {
                                        return (
                                            <div className={'row text-start'} style={{marginLeft: '6px'}}>
                                                <span style={{color: 'rgba(255, 255, 255, .5)'}}>{temp.dayOfWeek}, <span style={{color: 'white'}}>{temp.temp} °C</span></span>
                                            </div>
                                        )
                                    })}
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