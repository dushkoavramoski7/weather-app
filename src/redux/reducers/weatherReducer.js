import {GET_CITY, GET_CURRENT_WEATHER, GET_FORECAST_WEATHER} from "../actionTypes";

const initialState = {
    weatherToday: {},
    city: {},
    weatherForecast: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_WEATHER: {
            return {
                ...state,
                weatherToday: action.weatherToday
            }
        }
        case GET_CITY: {
            return {
                ...state,
                city: action.city[0]
            }
        }
        case GET_FORECAST_WEATHER: {
            return  {
                ...state,
                weatherForecast: action.weatherForecast
            }
        }
        default:
            return state
    }

}
export default reducer;