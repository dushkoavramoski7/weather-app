import {GET_AIR_POLLUTION, GET_CITY, GET_CURRENT_WEATHER, GET_FORECAST_WEATHER} from "../actionTypes";

const initialState = {
    weatherToday: {},
    city: {},
    weatherForecast: {},
    airPollution: {},
    averageTempWeek: [],
    averageTempNightWeek: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_WEATHER: {
            return {
                ...state,
                weatherToday: action.weatherToday,
                averageTempWeek: [],
                averageTempNightWeek: []
            }
        }
        case GET_CITY: {
            return {
                ...state,
                city: action.city[0]
            }
        }
        case GET_FORECAST_WEATHER: {
            let days = []
            let sumTemp = new Map();
            let days2 = []
            let sumTempNight = new Map();

            action.weatherForecast.list.filter((day) => (
                day?.dt_txt.split(" ")[1] === '12:00:00' ||
                    day?.dt_txt.split(" ")[1] === '15:00:00'
            )).map((weather) => {
                if(!days.includes(weather?.dt_txt.split(" ")[0]))
                {
                    days.push(weather?.dt_txt.split(" ")[0])
                }
                if(sumTemp.get(weather?.dt_txt.split(" ")[0]) === undefined)
                {
                    sumTemp.set(weather?.dt_txt.split(" ")[0], {day: new Date((weather?.dt * 1000) + (action.weatherForecast?.city?.timezone * 1000)).toLocaleDateString('en-US', {weekday: 'long',}),temp: weather?.main?.temp - 273.15, count: 1})
                }
                else {
                    let oldValue = sumTemp.get(weather?.dt_txt.split(" ")[0]);
                    let newValue = {day: oldValue.day ,temp: (oldValue.temp + (weather?.main?.temp - 273.15)), count: oldValue.count + 1 }
                    sumTemp.delete(weather?.dt_txt.split(" ")[0]);
                    sumTemp.set(weather?.dt_txt.split(" ")[0], newValue);
                }
            })
            days.map((day) => {
                if(sumTemp.get(day).count === 2) {
                    let avgTempPerDay = Math.round(sumTemp.get(day).temp / sumTemp.get(day).count);
                    state.averageTempWeek.push({day: day, dayOfWeek: sumTemp.get(day).day, temp: avgTempPerDay})
                }
            })

            action.weatherForecast.list.filter((day) => (
                day?.dt_txt.split(" ")[1] === '21:00:00' ||
                day?.dt_txt.split(" ")[1] === '00:00:00' ||
                day?.dt_txt.split(" ")[1] === '03:00:00'
            )).map((weather) => {
                if(!days2.includes(weather?.dt_txt.split(" ")[0]))
                {
                    days2.push(weather?.dt_txt.split(" ")[0])
                }
                if(sumTempNight.get(weather?.dt_txt.split(" ")[0]) === undefined)
                {
                    sumTempNight.set(weather?.dt_txt.split(" ")[0], {day: new Date((weather?.dt * 1000) + (action.weatherForecast?.city?.timezone * 1000)).toLocaleDateString('en-US', {weekday: 'long',}),temp: weather?.main?.temp - 273.15, count: 1})
                }
                else {
                    let oldValue = sumTempNight.get(weather?.dt_txt.split(" ")[0]);
                    let newValue = {day: oldValue.day ,temp: (oldValue.temp + (weather?.main?.temp - 273.15)), count: oldValue.count + 1 }
                    sumTempNight.delete(weather?.dt_txt.split(" ")[0]);
                    sumTempNight.set(weather?.dt_txt.split(" ")[0], newValue);
                }
            })
            days2.map((day) => {
                if(sumTempNight.get(day).count === 3) {
                    let avgTempPerDay = Math.round(sumTempNight.get(day).temp / sumTempNight.get(day).count);
                    state.averageTempNightWeek.push({day: day, dayOfWeek: sumTempNight.get(day).day, temp: avgTempPerDay})
                }
            })
            return  {
                ...state,
                weatherForecast: action.weatherForecast
            }
        }
        case GET_AIR_POLLUTION: {
            return {
                ...state,
                airPollution: action.airPollution
            }
        }
        default:
            return state
    }

}
export default reducer;