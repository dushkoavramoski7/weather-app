import axios from "../../axios/axiosInstance"
import {API_KEY} from "../../auth/api/ApiKey";
import {GET_CITY, GET_CURRENT_WEATHER, GET_FORECAST_WEATHER} from "../actionTypes";

export const weatherAction = {

    getWeatherToday: () => dispatch => {
        axios.get("/data/2.5/weather", { params: {q: 'Skopje', appid: API_KEY}}).then((resp) => {
            dispatch({
                type: GET_CURRENT_WEATHER,
                weatherToday: resp.data
            })
            axios.get("/geo/1.0/reverse", { params: {lat: resp.data.coord.lat, lon: resp.data.coord.lon, limit: 1, appid: API_KEY}}).then((resp1) => {
                dispatch({
                    type: GET_CITY,
                    city: resp1.data
                })
            })
        })
    },
    getWeatherForecast: () => dispatch => {
        axios.get("/data/2.5/forecast", { params: {q: 'Skopje', appid: API_KEY}}).then((resp) => {
            dispatch({
                type: GET_FORECAST_WEATHER,
                weatherForecast: resp.data
            })
        })
    }
}