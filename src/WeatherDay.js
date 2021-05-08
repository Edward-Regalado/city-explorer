import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './WeatherDay.css';

class WeatherDay extends React.Component {
  render() {
    return (

      <ListGroup.Item className="weatherDayContainer">
        <div className="description">{this.props.description}</div>
        <div className="date">{this.props.date}</div>
      </ListGroup.Item>
    )
  }
}

export default WeatherDay;