import axios from "../../axios/axiosInstance"
import {API_KEY} from "../../auth/api/ApiKey";
import {GET_AIR_POLLUTION, GET_CITY, GET_CURRENT_WEATHER, GET_FORECAST_WEATHER} from "../actionTypes";

export const weatherAction = {

    getWeatherToday: (city, callback) => dispatch => {
        axios.get("/data/2.5/weather", { params: {q: city, appid: API_KEY}}).then((resp) => {
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

            axios.get("/data/2.5/air_pollution", { params: {lat: resp.data.coord.lat, lon: resp.data.coord.lon, limit: 1, appid: API_KEY}}).then((resp2) => {
                dispatch({
                    type: GET_AIR_POLLUTION,
                    airPollution: resp2.data
                })
            })

            callback(true);
        })
        .catch(() => {
            callback(false);
        })
    },
    getWeatherForecast: (city) => dispatch => {
        axios.get("/data/2.5/forecast", { params: {q: city, appid: API_KEY}}).then((resp) => {
            dispatch({
                type: GET_FORECAST_WEATHER,
                weatherForecast: resp.data
            })
        })

    }
}