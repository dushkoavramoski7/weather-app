import { Line } from "react-chartjs-2";
import {Chart as ChartJS, Filler} from "chart.js/auto"

function LineChart ({data}){

    return (
        <>
            <Line data={
                {
                    labels: data.map((day) => [day.dayOfWeek, ' ' + day.day]),
                    datasets: [{
                        data: data.map((day) => day.temp),
                        pointBackgroundColor: 'rgb(44,67,116)',
                        backgroundColor: 'rgba(44,67,116, .2)',
                        borderColor: 'rgb(44,67,116)',
                        pointBorderColor: 'transparent',
                        pointBorderWidth: 0,
                        tension: 0.4,
                        fill: "stack",
                    }]
                }
            }
            options={{
                plugins: {
                    legend: false,
                    tooltip: {
                        backgroundColor: '#F8F8F8',
                        bodyColor: 'rgb(44,67,116)',
                        bodyFontSize: '60',
                        padding: '15',
                        titleColor: 'rgb(44,67,116)',
                        yAlign: 'bottom',
                        caretPadding: 15,
                        caretSize: 5,
                        cornerRadius: 7,
                        displayColors: false,
                        borderColor: '#E8E8E8',
                        borderWidth: 1,
                        bodyAlign: 'center',
                        callbacks: {
                            label: (value) => value.formattedValue + ' °C'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        min: -10,
                        max: 45,
                        ticks: {
                            stepSize: 10,
                            callback: (value) => value + ' °C'
                        },
                        grid: {
                            borderDash: [15]
                        }
                    }
                }
                }
            }/>
        </>
    )
}
export default LineChart;