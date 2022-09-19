import {
    GET_AIR_POLLUTION,
    GET_CITY,
    GET_CURRENT_WEATHER,
    GET_FORECAST_WEATHER,
    GET_WEATHER_DETAILS, SET_WEATHER_WEEK
} from "../actionTypes";
import {mostFrequent} from "../../utils/utils";
const initialState = {
    weatherToday: {},
    city: {},
    weatherForecast: {},
    airPollution: {},
    averageTempWeek: [],
    averageTempNightWeek: [],
    weatherDetails: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_WEATHER: {
            return {
                ...state,
                weatherToday: action.weatherToday,
                averageTempWeek: [],
                averageTempNightWeek: [],
                weatherDetails: []
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
                day?.dt_txt.split(" ")[1] === '09:00:00' ||
                    day?.dt_txt.split(" ")[1] === '12:00:00' ||
                        day?.dt_txt.split(" ")[1] === '15:00:00' ||
                            day?.dt_txt.split(" ")[1] === '18:00:00'
            )).map((weather) => {
                let weatherDesc = [];
                if(!days.includes(weather?.dt_txt.split(" ")[0]))
                {
                    days.push(weather?.dt_txt.split(" ")[0])
                }
                //second check
                if(sumTemp.get(weather?.dt_txt.split(" ")[0]) === undefined)
                {
                    weatherDesc.push(weather.weather?.[0]?.main)
                    sumTemp.set(weather?.dt_txt.split(" ")[0], {
                        day: new Date((weather?.dt * 1000) + (action.weatherForecast?.city?.timezone * 1000)).toLocaleDateString('en-US', {weekday: 'long',}),
                        temp: weather?.main?.temp - 273.15,
                        wind: weather?.wind?.speed,
                        rain: weather?.pop,
                        weather: weatherDesc,
                        count: 1
                    })
                }
                else {
                    let oldValue = sumTemp.get(weather?.dt_txt.split(" ")[0]);
                    oldValue.weather.push(weather.weather?.[0]?.main)
                    let newValue = {
                        day: oldValue.day,
                        temp: oldValue.temp < (weather?.main?.temp - 273.15) ? (weather?.main?.temp - 273.15) : oldValue.temp,
                        wind: oldValue.wind < weather?.wind?.speed ? weather?.wind?.speed : oldValue.wind,
                        rain: oldValue.rain  < weather?.pop ? weather?.pop : oldValue.rain,
                        weather: oldValue.weather,
                        count: oldValue.count + 1
                    }
                    sumTemp.delete(weather?.dt_txt.split(" ")[0]);
                    sumTemp.set(weather?.dt_txt.split(" ")[0], newValue);
                }
                // end second check
            })
            days.map((day) => {
                if(sumTemp.get(day).count === 4) {
                    state.averageTempWeek.push({
                        day: day,
                        dayOfWeek: sumTemp.get(day).day,
                        temp: Math.round(sumTemp.get(day).temp),
                        wind: Math.round(sumTemp.get(day).wind),
                        rain: Math.round((sumTemp.get(day).rain * 100)),
                        weather: mostFrequent(sumTemp.get(day).weather)
                    })
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
                    sumTempNight.set(weather?.dt_txt.split(" ")[0], {
                        day: new Date((weather?.dt * 1000) + (action.weatherForecast?.city?.timezone * 1000)).toLocaleDateString('en-US', {weekday: 'long',}),
                        temp: weather?.main?.temp - 273.15,
                        wind: weather?.wind?.speed,
                        rain: weather?.pop,
                        count: 1
                    })
                }
                else {
                    let oldValue = sumTempNight.get(weather?.dt_txt.split(" ")[0]);
                    let newValue = {
                        day: oldValue.day,
                        temp: oldValue.temp < (weather?.main?.temp - 273.15) ? (weather?.main?.temp - 273.15) : oldValue.temp,
                        wind: oldValue.wind < weather?.wind?.speed ? weather?.wind?.speed : oldValue.wind,
                        rain: oldValue.rain  < weather?.pop ? weather?.pop : oldValue.rain,
                        count: oldValue.count + 1
                    }
                    sumTempNight.delete(weather?.dt_txt.split(" ")[0]);
                    sumTempNight.set(weather?.dt_txt.split(" ")[0], newValue);
                }
            })
            days2.map((day) => {
                if(sumTempNight.get(day).count === 3) {
                    state.averageTempNightWeek.push({
                        day: day,
                        dayOfWeek: sumTempNight.get(day).day,
                        temp: Math.round(sumTempNight.get(day).temp),
                        wind: Math.round(sumTempNight.get(day).wind),
                        rain: Math.round((sumTempNight.get(day).rain * 100)),
                    })
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
        case GET_WEATHER_DETAILS: {
            const weather = []
            state.weatherForecast?.list.map((day) => {
                    if(day?.dt_txt.split(" ")[0] === action.day)
                    {
                        weather.push({
                            dayOfWeek: day?.dt_txt.split(" ")[1].split(":")[0] + ":" + day?.dt_txt.split(" ")[1].split(":")[1],
                            day: day?.dt_txt.split(" ")[0],
                            dayName: new Date((day?.dt * 1000)).toLocaleDateString('en-US', {weekday: 'long',}),
                            temp: Math.round(day?.main?.temp - 273.15)
                        })
                    }
            })
            return {
                ...state,
                weatherDetails: weather
            }
        }
        case SET_WEATHER_WEEK: {
            return {
                ...state,
                weatherDetails: []
            }
        }
        default:
            return state
    }

}
export default reducer;