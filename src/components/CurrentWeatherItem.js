import React from 'react';
import Skycons from 'react-skycons';

import { getWeeklyWeatherData, getWeatherIcon } from '../utils/WeatherAPI';

export default class CurrentWeatherItem extends React.Component {

    constructor () {
        super();
    }

    render () {
        console.log(this.props);
    return <div className="current-weather-item">
            <div className="icon">
                <Skycons color="white" icon={getWeatherIcon(this.props.weather.currentWeatherIcon)} />
            </div>
            <div id="desc" className="weather-parameter">{this.props.weather.currentWeatherDescription}</div>
            <div className="weather-parameters-wrapper">
                <div id="temp" className="weather-parameter">{this.props.weather.currentTemperature}</div>
                <div id="clouds" className="weather-parameter">{this.props.weather.currentClouds}</div>
                <div id="pressure" className="weather-parameter">{this.props.weather.currentPressure}</div>
            </div>
        </div>
    }
}