import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


class Weather extends React.Component {
  render() {
    let weatherList = this.props.weatherData.map((day, index) => (
      <ListGroup.Item key={index}>{`${day.date}: ${day.description}`}</ListGroup.Item>
      ))
    console.log('weather js front-end', this.props.weatherData);
    return (
      <ListGroup>
        {weatherList}
      </ListGroup>
    );
  }
}

export default Weather;
