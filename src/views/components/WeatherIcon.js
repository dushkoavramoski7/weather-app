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
            {weatherDesc!== undefined ?
                weatherDesc.includes("clear") ?
                    <img src={day} alt={""} style={{width: '50px', height: '50px'}} /> :
                        weatherDesc === "few clouds" ?
                            <img src={cloud} alt={""} style={{width: '50px', height: '50px'}} /> :
                                weatherDesc === "scattered clouds" ?
                                    <img src={cloudy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                        weatherDesc === "broken clouds" ?
                                            <img src={cloudy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                weatherDesc.includes("clouds") ?
                                                    <img src={cloudy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                        weatherDesc.includes("rain") ?
                                                            <img src={rainy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                weatherDesc.includes("thunderstorm") ?
                                                                    <img src={storm} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                        weatherDesc.includes("drizzle") ?
                                                                            <img src={rainy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                                weatherDesc.includes("snow") ?
                                                                                    <img src={snowy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                                        weatherDesc === "mist" ?
                                                                                            <img src={foog} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                                                <img src={day} alt={""} style={{width: '50px', height: '50px'}} /> : null
        }
        </>
    )
}
export default WeatherIcon;