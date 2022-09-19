import {useStyles} from "../factory/StyleFactory";
import {weatherViewStyle} from "./style/WeatherViewStyle";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {weatherAction} from "../redux/action/weatherAction";
import WeatherIcon from "./components/WeatherIcon";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {styled} from "@mui/material";
import sunrise from "../img/sunrise.png"
import sunset from "../img/sunset.png"
import visibility from "../img/low-visibility.png"
import windDirection from "../img/wind-direction.png"
import LineChart from "./components/LineChart";
import WeatherToday from "./components/WeatherToday";
import WeatherWeek from "./components/WeatherWeek";
import TopBar from "./components/page_element/TopBar";
import {formatAMPMHours, formatAMPMHoursAndMinutes} from "../utils/utils";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";

function WeatherView() {
    const dispatch = useDispatch();
    const classes = useStyles(weatherViewStyle);
    const weatherToday = useSelector(state => state.weather.weatherToday);
    const weatherForecast = useSelector(state => state.weather.weatherForecast);
    const averageTempWeek = useSelector(state => state.weather.averageTempWeek);
    const weatherDetails = useSelector(state => state.weather.weatherDetails);
    const city = useSelector(state => state.weather.city);
    const [weatherTodayActive, setWeatherTodayActive] = useState(true);

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

    return (
        <div style={{height: '100%',width:'100%', margin:0}} className={'row'}>
            <div className={'col-8'}>
                <TopBar/>
                <div className={`row mt-2 p-3 ${classes.fontMain}`}>
                    <div className={'row d-flex justify-content-between'}>
                        <div style={{fontSize: '20px', color:'rgb(64,93,159)', fontWeight: 'bold', marginLeft: '13px', cursor: "pointer"}} className={'col-5'}>
                            <span onClick={() => setViewWeatherToday(true)}>
                                Today overview <TodayRoundedIcon fontSize={'medium'}  sx={{color: 'rgb(64,93,159)', marginBottom: '4px'}}/>
                            </span>
                        </div>
                        <div style={{fontSize: '20px', color:'rgb(64,93,159)', fontWeight: 'bold', marginRight: '13px', textAlign: 'end', cursor: "pointer"}} className={`col-5`}>
                            <span onClick={() => setViewWeatherToday(false)}>
                                Week overview <DateRangeRoundedIcon fontSize={'medium'}  sx={{color: 'rgb(64,93,159)', marginBottom: '4px'}}/>
                            </span>
                        </div>
                    </div>

                    {weatherTodayActive ? <WeatherToday/> : <WeatherWeek/> }

                    <div className={`row mt-4 p-3 ${classes.fontMain}`}>
                        <div style={{fontSize: '20px', color:'rgb(64,93,159)', fontWeight: 'bold', marginLeft: '13px'}} className={'mb-4'}>{weatherDetails.length !== 0 ? 'Temperature ' + weatherDetails[0]?.day + ', ' + weatherDetails[0]?.dayName : 'Week Temperature (Day)'}</div>
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
                        <div style={{fontSize: '40px'}}>{city?.name}<span style={{fontSize: '20px'}}></span></div>
                        <div style={{color: 'rgba(255, 255, 255, .5)'}}>{city?.country}, {city?.state}</div>
                    </div>
                    <div className={'col-5 position-relative'}>
                        <b className={'align-middle position-absolute text-center'} style={{top: '40%', right: 0}}>
                            {formatAMPMHoursAndMinutes(new Date((new Date().getTime())+(weatherToday.timezone * 1000)))}
                        </b>
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
                        <b className={'align-middle position-absolute text-end'} style={{top: '45%', right: 0, fontSize: '22px', color: 'rgba(255, 255, 255, .7)', textTransform: 'capitalize'}}>
                            {weatherToday?.weather?.[0]?.description}
                        </b>
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
                                        <b>
                                            {formatAMPMHours(new Date((weather?.dt * 1000) + (weatherForecast?.city?.timezone * 1000))).slice(0,2)}
                                        </b>
                                        {formatAMPMHours(new Date((weather?.dt * 1000) + (weatherForecast?.city?.timezone * 1000))).slice(2)}
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
                <div className={`row mb-3 mt-3 text-white ${classes.fontMain}`} style={{marginTop: '15px'}}>
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
        </div>
    )
}
export default WeatherView;