import React from 'react';
import './App.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import Weather from './Weather';
import Movies from './Movies';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { Card } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      cityData: {},
      weatherData: [],
      movieData: [],
      lat: '',
      lon: ''
    };
  }
  handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.city);
    try {
      const cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
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
      const weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`, {
        params: {
          lat: this.state.lat,
          lon: this.state.lon
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
      const movieData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies`, {
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
        <Container>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group controlId="city">
              <Form.Label>City name</Form.Label>
              <Form.Control value={this.state.city} onInput={e => this.setState({ city: e.target.value })} placeholder="enter city name"></Form.Control>
            </Form.Group>
            <Button variant="success" type="submit">Explore!</Button>
          </Form>
          {this.state.error ?
            <Alert variant="danger">
              <Alert.Heading>Error Message: {this.state.error}</Alert.Heading></Alert> : ''}
          {/* <h2>{this.state.error}</h2> : ''} */}
          {this.state.cityData.lat !== undefined ?
            <>
              <Card bg="light" border="warning">
                <Card.Body>
                  <Card.Title>{this.state.cityData.display_name}</Card.Title>
                  <Card.Text>{this.state.cityData.lat}, {this.state.cityData.lon}</Card.Text>
                  <Card.Img variant="bottom" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt={`Map of ${this.state.cityData.display_name}`} />
                </Card.Body>
              </Card>
              <Weather weatherData={this.state.weatherData} />
              <Movies movieData={this.state.movieData} />
            </>
            : ''}
        </Container>
      </>
    );
  }
}

export default App;
