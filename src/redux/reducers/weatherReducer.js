import {GET_CURRENT_WEATHER} from "../actionTypes";

const initialState = {
    weatherToday: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_WEATHER: {
            return {
                ...state,
                weatherToday: action.weatherToday
            }
        }
        default:
            return state
    }

}
export default reducer;