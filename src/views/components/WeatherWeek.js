import {useStyles} from "../../factory/StyleFactory";
import {weatherViewStyle} from "../style/WeatherViewStyle";
import {useDispatch, useSelector} from "react-redux";
import WeatherIcon from "./WeatherIcon";
import {styled} from "@mui/material";
import LinearProgress, {linearProgressClasses} from "@mui/material/LinearProgress";
import {weatherAction} from "../../redux/action/weatherAction";
import {useScrollTo} from "react-use-window-scroll";

function WeatherWeek() {
    const classes = useStyles(weatherViewStyle);
    const averageTempWeek = useSelector(state => state.weather.averageTempWeek);
    const averageTempNightWeek = useSelector(state => state.weather.averageTempNightWeek);
    const dispatch = useDispatch();
    const scrollTo = useScrollTo();


    const BorderLinearProgress = styled(LinearProgress)(() => ({
        height: 22,
        borderRadius: 12,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: 'rgba(44,67,116, .2)',
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 15,
            backgroundColor: 'rgba(44,67,116, .6)',
        },
    }));

    const getWeatherDetails = (day) => {
        scrollTo({ top: window.innerHeight, behavior: "smooth" })
        dispatch(weatherAction.getWeatherDetails(day));
    }

    return (
        <>
            <div className={'row d-flex justify-content-around mt-3'}>
                {averageTempNightWeek && averageTempWeek && averageTempNightWeek.slice(0, 3).map((night, i) => {
                    return (
                        <div className={`m-2 ${classes.cardsStyle} ${classes.fontMain}`} style={{width:'30%', height: '300px'}} key={i}>
                            <div className={'row'} style={{backgroundImage: 'linear-gradient(260deg,rgba(44,67,116, .9),rgba(44,67,116, .84))', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                                <div className={'col-6 mt-3 d-flex justify-content-center'}>
                                    <WeatherIcon weatherDesc={averageTempWeek[i].weather} />
                                </div>
                                <div className={'col-6 mt-2'}>
                                    <div style={{fontSize: '12px', color: 'rgba(255, 255, 255, .8)'}} className={'row'}>
                                        <div className={'d-flex justify-content-end text-end'}>
                                            {averageTempWeek[i].dayOfWeek}
                                            <br/>
                                            {averageTempWeek[i].day}
                                        </div>
                                    </div>

                                    <div style={{fontSize: '15px', color: 'rgba(255, 255, 255)'}} className={'row d-flex justify-content-end'}>
                                        <div className={'d-flex justify-content-center'}>
                                            <b style={{fontSize: '35px'}}>{averageTempWeek[i].temp} <span style={{fontSize: '25px', fontWeight:'normal'}}>°C</span></b>
                                        </div>
                                    </div>

                                    <div style={{fontSize: '21px', color: 'rgba(255, 255, 255, .8)'}} className={'row mb-3'}>
                                        <div className={'d-flex justify-content-end text-end'}>
                                            {averageTempWeek[i].weather}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'row d-flex justify-content-center'} >
                                <div style={{fontSize: '12px'}} className={'mb-1 mt-2 d-flex justify-content-center'}>Chance or rain: <span style={{marginLeft: '6px'}}>  </span><b style={{color: 'rgba(44,67,116, .9)'}}>{averageTempWeek[i].rain}%</b></div>
                                <div className={'row mb-3'}>
                                        <div className={'col-1'}>

                                        </div>
                                        <div className={'col-10'}>
                                            <BorderLinearProgress variant="determinate" value={averageTempWeek[i].rain} />
                                        </div>
                                        <div className={'col-1'}>

                                        </div>
                                </div>
                                <div className={'row mb-2'}>
                                    <div className={'col-7 d-flex justify-content-center text-center'} style={{fontSize: '13px', color: 'rgba(0, 0, 0, .5)'}}>
                                        Wind Speed:
                                    </div>
                                    <div className={'col-5 d-flex justify-content-center text-center'} style={{fontSize: '13px', color: 'rgba(0, 0, 0, .5)'}}>
                                        <b>{averageTempWeek[i].wind} km/h</b>
                                    </div>
                                </div>
                                <div className={'row mb-2'}>
                                    <div className={'col-7 d-flex justify-content-center text-center'} style={{fontSize: '13px', color: 'rgba(0, 0, 0, .5)'}}>
                                        Temp Night:
                                    </div>
                                    <div className={'col-5 d-flex justify-content-center text-center'} style={{fontSize: '13px', color: 'rgba(0, 0, 0, .5)'}}>
                                        <b>{night.temp} °C</b>
                                    </div>
                                </div>
                                <div className={'row mb-2 d-flex justify-content-center'}>
                                    <div style={{fontSize: '12px',fontWeight:'bold', color: 'rgba(44,67,116, .9)', cursor: "pointer"}} className={`d-flex justify-content-center col-5 ${classes.greyBackgroundHover}`}
                                         onClick={() => getWeatherDetails(averageTempWeek[i].day)}>
                                        See more
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default WeatherWeek;