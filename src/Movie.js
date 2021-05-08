import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './Movie.css';

class Movie extends React.Component {
  render() {
    return (

      <ListGroup.Item className="movieBox">
        <div className="movieBox">
          {this.props.title}: 
          <img src={this.props.image_url} alt="Movie" />
        </div>
      </ListGroup.Item>
    );
  }
}

export default Movie;
