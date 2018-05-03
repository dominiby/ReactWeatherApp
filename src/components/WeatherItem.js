import React from 'react';
import Skycons from 'react-skycons';

import { getWeeklyWeatherData, getWeatherIcon } from '../utils/WeatherAPI';

export default class WeatherItem extends React.Component {

    constructor (props) {
        super(props);
    }

    renderDayName () {
        let dayNumber = new Date().getDay();
        if (this.props.weather.date) {
            dayNumber = new Date(this.props.weather.date.substring(0, 10)).getDay();
        }
        let dayName = '';
        switch (dayNumber) {
            case 1: dayName = 'Monday'; break;
            case 2: dayName = 'Tuesday'; break;
            case 3: dayName = 'Wednesday'; break;
            case 4: dayName = 'Thursday'; break;
            case 5: dayName = 'Friday'; break;
            case 6: dayName = 'Saturday'; break;
            case 0: dayName = 'Sunday'; break;
        }

        return <h2>{dayName}</h2>
    }

    render () {
    return <div className="weather-item">
            {this.renderDayName()}
            <div className="icon">
                <Skycons color="white" icon={getWeatherIcon(this.props.weather.weatherIcon)} />
            </div>
            <div id="desc" className="weather-parameter">{this.props.weather.weatherDescription}</div>
            <div className="weather-parameters-wrapper">
                <div id="temp" className="weather-parameter">{this.props.weather.temperature}</div>
                <div id="clouds" className="weather-parameter">{this.props.weather.clouds}</div>
                <div id="pressure" className="weather-parameter">{this.props.weather.pressure}</div>
            </div>
        </div>
    }
}