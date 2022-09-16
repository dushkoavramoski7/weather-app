import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import wind from "../../img/wind.png";
import warm from "../../img/warm.png";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import humidity from "../../img/humidity.png";
import pollution from "../../img/atmospheric-pollution.png";
import {useSelector} from "react-redux";
import {useStyles} from "../../factory/StyleFactory";
import {weatherViewStyle} from "../style/WeatherViewStyle";

function WeatherToday({setActive}) {
    const weatherToday = useSelector(state => state.weather.weatherToday);
    const airPollution = useSelector(state => state.weather.airPollution);
    const airPollutionQuality = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    const classes = useStyles(weatherViewStyle);

    return (
        <>
            <div className={'row d-flex justify-content-between'}>
                <div style={{fontSize: '20px', color:'rgb(44,67,116)', fontWeight: 'bold', marginLeft: '13px'}} className={'col-5'}>Today overview</div>
                <div style={{fontSize: '20px', color:'#4b6cb7', fontWeight: 'bold', marginRight: '13px', textAlign: 'end'}} className={`col-5`}> <span className={`${classes.hoverMarginBottom}`} onClick={setActive}> Week overview</span> <LaunchRoundedIcon fontSize={'small'}  sx={{color: '#4b6cb7', marginBottom: '4px'}}/></div>
            </div>
            <div className={'row d-flex justify-content-around mt-3'}>
                <div className={` m-2 ${classes.cardsStyle}`} style={{width: '45%'}}>
                    <div className={'row'}  style={{height: '150px'}}>
                        <div className={'col-3 d-flex justify-content-center'}>
                            <img src={wind} alt={""} style={{margin: 'auto', width: '60px', height: '60px'}} />
                        </div>
                        <div className={'col-9 mt-3'} >
                            <div className={'d-flex justify-content-start'}>
                                <div><div style={{color: '#A9A9A9'}} className={"mb-2 "}>Wind Speed</div>
                                    <span style={{color: 'rgb(44,67,116)', fontSize: '27px'}} className={"mt-4"}> <b style={{fontSize: '47px'}}>{weatherToday?.wind?.speed}</b> km/h</span>
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
        </>
    )
}
export default WeatherToday;