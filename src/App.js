import React from 'react';
import './App.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Weather from './Weather';
import Movies from './Movies';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      cityData: {},
      weatherData: [],
      movieData: []
    };
  }
  handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.city);
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
      let searchedCity = cityData.data[0];
      this.setState({
        cityData: searchedCity,
        lat: cityData.data[0].lat,
        lon: cityData.data[0].lon
      });
      this.getWeatherData(cityData.data[0].lat, cityData.data[0].lon);
      this.getMovieData();
    } catch (err) {
      console.log(err);
      this.setState({ error: err.message });
    }
  }

  getWeatherData = async (lat, lon) => {
    try {
      let weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`, {
        params: {
          lat: lat,
          lon: lon
        }
      });
      this.setState({
        weatherData: weatherData.data
      })
      // console.log(this.state);
    } catch (err) {
      console.log(err.message);
      this.setState({ error: err.message });
    }
  }

  getMovieData = async () => {
    try {
      let movieData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies`, {
        params: {
          city: this.state.city,
        }
      });
      console.log(movieData.data);
      this.setState({
        movieData: movieData.data
      });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="city">
            <Form.Label>City name</Form.Label>
            <Form.Control value={this.state.city} onInput={e => this.setState({ city: e.target.value })}></Form.Control>
          </Form.Group>
          <Button variant="success" type="submit">Explore!</Button>
        </Form>
        { this.state.error ? <h2>{this.state.error}</h2> : ''}
        {this.state.cityData.lat !== undefined ?
          <>
            <Jumbotron>
              <h3>{this.state.cityData.display_name}</h3>
              <h5>{this.state.cityData.lat}, {this.state.cityData.lon}</h5>
              <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt={`Map of ${this.state.cityData.display_name}`} />
            </Jumbotron>
            <Weather weatherData={this.state.weatherData} />
            <Movies movieData={this.state.movieData} />
          </>
          : ''}
      </>
    );
  }
}

export default App;
