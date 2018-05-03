import React from 'react';
import WeatherItem from './WeatherItem';

import { getTodayWeatherData, getWeeklyWeatherData, getWeatherIcon } from '../utils/WeatherAPI';

export default class Weather extends React.Component {

    constructor() {
        super();

        this.state = {            
            currentWeather: {
                temperature: '',
                pressure: '',
                weatherDescription: '',
                weatherIcon: '',
                clouds: ''
            },
            weekWeather: []
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

    is12AM (weeklyWeatherListItem) {
        return weeklyWeatherListItem.dt_txt.indexOf('12:00:00') !== -1;
    }

    convert (weatherItem) {
        return {
            temperature: 'Temperature: ' + (Number(weatherItem.main.temp - 273.15).toFixed(1)) + ' °C',
            pressure: 'Pressure: ' + weatherItem.main.pressure + ' hPa',
            weatherDescription: weatherItem.weather[0].description,
            weatherIcon: weatherItem.weather[0].id,
            clouds: 'Clouds: ' + weatherItem.clouds.all + '%',
            date: weatherItem.dt_txt
        }
    }

    setWeatherData(city) {

        getTodayWeatherData(city)
            .then((data) => {
                if (!(data.cod === "404" || data.message === "city not found" || data.message === "Nothing to geocode")) {
                    this.setState({
                        currentWeather: {
                            temperature: 'Temperature: ' + (Number(data.main.temp - 273.15).toFixed(1)) + ' °C',
                            pressure: 'Pressure: ' + data.main.pressure + ' hPa',
                            weatherDescription: data.weather[0].description,
                            weatherIcon: data.weather[0].id,
                            clouds: 'Clouds: ' + data.clouds.all + '%'
                        }
                    });
                }
            });

        getWeeklyWeatherData(city)
            .then((data) => {
                if (!(data.cod === "404" || data.message === "city not found" || data.message === "Nothing to geocode")) {
                    var weatherDataList = data.list;
                    weatherDataList = weatherDataList.filter(this.is12AM);
                    console.log(weatherDataList);
                    weatherDataList = weatherDataList.map(this.convert);
                    this.setState({
                        weekWeather: weatherDataList
                    });
                }
            });

    }

    render() {
        return (
            <div className="weather-wrapper">
                <div className="input-wrapper">
                    <input id="cityInput" type="text" defaultValue="Rzeszów" onChange={this.handleInput.bind(this)} />
                </div>
                <div className="current-weather">
                    <WeatherItem weather={this.state.currentWeather} />
                </div>
                <div className="week-weather">
                    {this.state.weekWeather.map((weatherData, i) => {
                        return <div key={i} className="week-item">
                            <WeatherItem weather={weatherData} />
                        </div>
                    })}
                </div>

            </div>
        )
    }


}