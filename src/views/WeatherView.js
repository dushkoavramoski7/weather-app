import {useStyles} from "../factory/StyleFactory";
import {weatherViewStyle} from "./style/WeatherViewStyle";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {weatherAction} from "../redux/action/weatherAction";
import WeatherIcon from "./components/WeatherIcon";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {styled} from "@mui/material";
import sunrise from "../img/sunrise.png"
import sunset from "../img/sunset.png"


function WeatherView() {
    const dispatch = useDispatch();
    const classes = useStyles(weatherViewStyle);
    const weatherToday = useSelector(state => state.weather.weatherToday);
    const weatherForecast = useSelector(state => state.weather.weatherForecast);
    const city = useSelector(state => state.weather.city);

    useEffect(() => {
        dispatch(weatherAction.getWeatherToday());
        dispatch(weatherAction.getWeatherForecast());
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

    function formatAMPM(date) {
        let hours = date.getUTCHours();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        return hours + ' '+ ampm;
    }

    return (
        <div style={{height: '100%',width:'100%', margin:0 ,background: 'whitesmoke'}} className={'row'}>
            <div className={'col-8'}>
            </div>
            <div className={`col-4 ${classes.darkBlueGradient}`}>
                <div className={`row p-5 text-white ${classes.fontMain}`}>
                    <div className={'col-7'}>
                        <div style={{fontSize: '40px'}}>{city?.name}<span style={{fontSize: '20px'}}></span> </div>
                        <div style={{color: 'rgb(168, 177, 189)'}}>{city?.country}, {city?.state}</div>
                    </div>
                    <div className={'col-5 position-relative'}>
                        <span className={'align-middle position-absolute text-center'} style={{top: '40%', right: 0}}>{new Date((new Date().getTime())+(weatherToday.timezone * 1000)).toUTCString().slice(16)}</span>
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
                        <b className={'align-middle position-absolute text-end'} style={{top: '45%', right: 0, fontSize: '22px', color: 'rgb(168, 177, 189)', textTransform: 'capitalize'}}>{weatherToday?.weather?.[0]?.description}</b>
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
                                        <b>{formatAMPM(new Date((weather?.dt * 1000) + (weatherForecast?.city?.timezone * 1000))).slice(0,2)}</b> {formatAMPM(new Date((weather?.dt * 1000) + (weatherForecast?.city?.timezone * 1000))).slice(2)}
                                    </div>
                                    <div className={'col-8'}>
                                        <BorderLinearProgress variant="determinate" value={weather?.pop * 100} />
                                    </div>
                                    <div className={'col-2 text-start mt-1'} style={{fontSize: '15px'}}>
                                        <b>{weather?.pop * 100}</b> %
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={`row mb-3 text-white ${classes.fontMain}`} style={{marginTop: '0px'}}>
                    <div className={'mb-3'} style={{fontSize: '18px', paddingLeft: '36px'}}>Sunrise & Sunset:</div>
                    <div className={'d-flex justify-content-around'}>
                    <div className={'m-2'} style={{height: '110px', backgroundColor: 'rgb(140,178,251, .09)', width: '45%', borderRadius: '10px'}}>
                        <div className={'row'}>
                            <div className={'col-4'} style={{marginTop: '30px', paddingLeft: '30px'}}>
                                <img src={sunrise} alt={""} style={{width: '50px', height: '50px'}} />
                            </div>
                            <div className={'col-8 mt-3'}>
                                <div style={{color: 'rgba(255, 255, 255, .5)'}} className={'text-center'}>Sunrise</div>
                                <div style={{fontSize: '25px'}} className={'text-center'}>
                                    {formatAMPM(new Date((weatherToday?.sys?.sunrise * 1000) + (weatherToday?.timezone * 1000)))}
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
                                    {formatAMPM(new Date((weatherToday?.sys?.sunset * 1000) + (weatherToday?.timezone * 1000)))}
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