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
                weatherDesc.toLowerCase().includes("clear") ?
                    <img src={day} alt={""} style={{width: '50px', height: '50px'}} /> :
                        weatherDesc.toLowerCase() === "few clouds" ?
                            <img src={cloud} alt={""} style={{width: '50px', height: '50px'}} /> :
                                weatherDesc.toLowerCase() === "scattered clouds" ?
                                    <img src={cloudy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                        weatherDesc.toLowerCase() === "broken clouds" ?
                                            <img src={cloudy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                weatherDesc.toLowerCase().includes("clouds") ?
                                                    <img src={cloudy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                        weatherDesc.toLowerCase().includes("rain") ?
                                                            <img src={rainy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                weatherDesc.toLowerCase().includes("thunderstorm") ?
                                                                    <img src={storm} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                        weatherDesc.toLowerCase().includes("drizzle") ?
                                                                            <img src={rainy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                                weatherDesc.toLowerCase().includes("snow") ?
                                                                                    <img src={snowy} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                                        weatherDesc.toLowerCase() === "mist" ?
                                                                                            <img src={foog} alt={""} style={{width: '50px', height: '50px'}} /> :
                                                                                                <img src={day} alt={""} style={{width: '50px', height: '50px'}} /> : null
        }
        </>
    )
}
export default WeatherIcon;