import React from 'react';
import WeatherDay from './WeatherDay';
import ListGroup from 'react-bootstrap/ListGroup';
import './Weather.css';


class Weather extends React.Component {
  render() {
    let weatherList = this.props.weatherData.map((day, index) => (
      <WeatherDay key={index} description={day.description} date={day.date} />
    ))
    return (
      <div className="weatherContainer">
        <ListGroup.Item className="weatherList">
          {weatherList}
        </ListGroup.Item>
      </div >
    )
  }
}

export default Weather;

// let weatherList = this.props.weatherData.map((day, index) => (
// <ListGroup.Item key={index}>{`${day.date}: ${day.description}`}</ListGroup.