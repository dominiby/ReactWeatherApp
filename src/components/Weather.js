import React from 'react';
import CurrentWeatherItem from './CurrentWeatherItem';

import { getTodayWeatherData, getWeeklyWeatherData, getWeatherIcon } from '../utils/WeatherAPI';

export default class Weather extends React.Component {

    constructor() {
        super();

        this.state = {            
            currentWeather: {
                currentTemperature: '',
                currentPressure: '',
                currentWeatherDescription: '',
                currentWeatherIcon: '',
                currentClouds: ''
            }
        };

        this.timeout = null;

        this.setWeatherData("Rzeszów");
    }

    setWeatherWithDelay(value) {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.setWeatherData(value);
        }, 1000);
    }

    handleInput(e) {
        this.setWeatherWithDelay(e.target.value);
    }

    setWeatherData(city) {

        getTodayWeatherData(city)
            .then((data) => {
                if (!(data.cod === "404" || data.message === "city not found" || data.message === "Nothing to geocode")) {
                    this.setState({
                        currentWeather: {
                            currentTemperature: 'Temperature: ' + (Number(data.main.temp - 273.15).toFixed(1)) + ' °C',
                            currentPressure: 'Pressure: ' + data.main.pressure + ' hPa',
                            currentWeatherDescription: data.weather[0].description,
                            currentWeatherIcon: data.weather[0].id,
                            currentClouds: 'Clouds: ' + data.clouds.all + '%'
                        }
                    });
                }
            });

    }

    render() {
        console.log(this.state.currentWeather);
        return (
            <div className="weather-wrapper">
                <div className="input-wrapper">
                    <input id="cityInput" type="text" defaultValue="Rzeszów" onChange={this.handleInput.bind(this)} />
                </div>
                <div className="current-weather">
                    <CurrentWeatherItem weather={this.state.currentWeather} />
                </div>

            </div>
        )
    }


}