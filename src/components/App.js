import React from 'react';

import Weather from './Weather';

export default class App extends React.Component {
    render () {
        return(
            <div className="container">
                <h1>ReactWeatherApp</h1>
                <Weather/>
            </div>
        )
    }
}