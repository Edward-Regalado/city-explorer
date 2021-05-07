import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


class WeatherDay extends React.Component {
  render() {
    return(
      <ListGroup.Item> {this.props.description}: {this.props.date}</ListGroup.Item>
    )
  }
}

export default WeatherDay;

// let weatherList = this.props.weatherData.map((day, index) => (
// <ListGroup.Item key={index}>{`${day.date}: ${day.description}`}</ListGroup.