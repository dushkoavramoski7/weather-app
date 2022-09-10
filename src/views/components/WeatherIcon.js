import day from "../../img/day.png"
import cloud from "../../img/cloud.png"
import cloudy from "../../img/cloudy.png"
import rainy from "../../img/rainy.png"
import storm from "../../img/storm.png"
import snowy from "../../img/snowy.png"
import foog from "../../img/foog.png"


function WeatherIcon({weatherDesc}) {
    return (
        <>
        { weatherDesc === "clear sky" ?
            <img src={day} alt={""} style={{width: '50px', height: '50px'}} /> :
                weatherDesc === "few clouds" ?
                    <img src={cloud} alt={""} style={{width: '50px', height: '50px'}} /> :
                        weatherDesc === "scattered clouds" ?
                            <img src={cloudy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                weatherDesc === "broken clouds" ?
                                    <img src={cloudy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                        weatherDesc === "shower rain" ?
                                            <img src={rainy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                weatherDesc === "rain" ?
                                                    <img src={rainy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                        weatherDesc === "thunderstorm" ?
                                                            <img src={storm} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                weatherDesc === "snow" ?
                                                                    <img src={snowy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                        weatherDesc === "mist" ?
                                                                            <img src={foog} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                                <img src={day} alt={""} style={{width: '50px', height: '50px'}} />
        }
        </>
    )
}
export default WeatherIcon;