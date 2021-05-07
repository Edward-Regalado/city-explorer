import React from 'react';
import WeatherDay from './WeatherDay';
import ListGroup from 'react-bootstrap/ListGroup';


class Weather extends React.Component {
  render() {
    let weatherList = this.props.weatherData.map((day, index) => (
      <WeatherDay key={index} description={day.description} date={day.date} />
    ))
    return(
      <ListGroup.Item>
        {weatherList}
      </ListGroup.Item>
    )
  }
}

export default Weather;

// let weatherList = this.props.weatherData.map((day, index) => (
// <ListGroup.Item key={index}>{`${day.date}: ${day.description}`}</ListGroup.