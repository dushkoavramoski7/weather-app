import axios from "../../axios/axiosInstance"
import {API_KEY} from "../../auth/api/ApiKey";
import {GET_CURRENT_WEATHER} from "../actionTypes";

export const weatherAction = {
    getWeatherToday: () => dispatch => {
        axios.get("/data/2.5/weather", { params: {lat : 42, lon: 21.4333, appid: API_KEY}}).then(resp => {
            dispatch({
                type: GET_CURRENT_WEATHER,
                weatherToday: resp.data
            })
        })
    }
}