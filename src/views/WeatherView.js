import {useStyles} from "../factory/StyleFactory";
import {weatherViewStyle} from "./style/WeatherViewStyle";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {weatherAction} from "../redux/action/weatherAction";

function WeatherView() {
    const dispatch = useDispatch();
    const classes = useStyles(weatherViewStyle);
    const weatherToday = useSelector(state => state.weather.weatherToday);

    useEffect(() => {
        dispatch(weatherAction.getWeatherToday());
    }, []);

    return (
        <>
            <div className={'text-center p-5'}>
                Weather Today:
                <h1>{weatherToday?.name}</h1>
                <h4><b>{Math.round(weatherToday?.main?.temp  - 273.15 )}</b>°C</h4>
            </div>
        </>
    )
}
export default WeatherView;