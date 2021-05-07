import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Movie extends React.Component {
  render() {
    return (
      <ListGroup.Item >{this.props.title}: <img src={this.props.image_url} alt="Movie" /> </ListGroup.Item>
    );
  }
}

export default Movie;
