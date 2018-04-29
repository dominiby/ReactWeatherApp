import React from 'react';
import Skycons from 'react-skycons';

import { getWeatherData, getWeatherIcon } from '../utils/WeatherAPI';

export default class Weather extends React.Component {

    constructor() {
        super();
        this.timeout = null;
        this.state = {
        };

        this.setWeatherData("Rzeszów");
    }

    doIt(value) {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.setWeatherData(value);
        }, 1000);

    }



    handleInput(e) {
        this.doIt(e.target.value);
    }

    setWeatherData(city) {

        getWeatherData(city)
            .then((data) => {
                console.log(data);
                if (!(data.cod === "404" || data.message === "city not found" || data.message === "Nothing to geocode")) {
                    this.setState({
                        temp: (Number(data.main.temp - 273.15).toFixed(1)) + '°C',
                        pressure: "Pressure: " + data.main.pressure + " hPa",
                        clouds: "Clouds: " + data.clouds.all + '%',
                        description: data.weather[0].description,
                        icon: data.weather[0].id
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
                <div id="weather" className="weather">
                    <div className="icon">
                        <Skycons color="white" icon={getWeatherIcon(this.state.icon)} />
                    </div>
                    <div id="desc" className="weather-parameter">{this.state.description}</div>
                    <div id="temp" className="weather-parameter">{this.state.temp}</div>
                    <div id="clouds" className="weather-parameter">{this.state.clouds}</div>
                    <div id="pressure" className="weather-parameter">{this.state.pressure}</div>
                </div>

            </div>
        )
    }


}