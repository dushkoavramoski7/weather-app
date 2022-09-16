import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import {useStyles} from "../../factory/StyleFactory";
import {weatherViewStyle} from "../style/WeatherViewStyle";
import {useSelector} from "react-redux";
import WeatherIcon from "./WeatherIcon";
import {styled} from "@mui/material";
import LinearProgress, {linearProgressClasses} from "@mui/material/LinearProgress";

function WeatherWeek({setActive}) {
    const classes = useStyles(weatherViewStyle);
    const averageTempWeek = useSelector(state => state.weather.averageTempWeek);
    const averageTempNightWeek = useSelector(state => state.weather.averageTempNightWeek);

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

    return (
        <>
            <div className={'row d-flex justify-content-between'}>
                <div style={{fontSize: '20px', color:'rgb(44,67,116)', fontWeight: 'bold', marginLeft: '13px'}} className={'col-5'}>Week overview</div>
                <div style={{fontSize: '20px', color:'#4b6cb7', fontWeight: 'bold', marginRight: '13px', textAlign: 'end'}} className={`col-5`}> <span className={`${classes.hoverMarginBottom}`} onClick={setActive}> Today overview</span> <LaunchRoundedIcon fontSize={'small'}  sx={{color: '#4b6cb7', marginBottom: '4px'}}/></div>
            </div>
            <div className={'row d-flex justify-content-around mt-3'}>
                {averageTempNightWeek && averageTempWeek && averageTempNightWeek.map((night, i) => {
                    return (
                        <div className={`m-2 ${classes.cardsStyle} ${classes.fontMain}`} style={{width: '23%', height: '280px'}} key={i}>
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

                                    <div style={{fontSize: '21px', color: 'rgba(255, 255, 255, .6)'}} className={'row mb-3'}>
                                        <div className={'d-flex justify-content-end text-end'}>
                                            {averageTempWeek[i].weather}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
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
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )
}
export default WeatherWeek;