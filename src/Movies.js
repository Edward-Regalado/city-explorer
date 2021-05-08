import React from 'react';
import Movie from './Movie';
import ListGroup from 'react-bootstrap/ListGroup';
import './Movies.css';

class Movies extends React.Component {
  render() {
    let movies = this.props.movieData.map((infor, index) => (
      <Movie key={index} title={infor.title} overview={infor.overview} image_url={infor.image_url} />
    ))
    return (
      <div className="movieContainer">
        <ListGroup className="movieContainer">
          {movies}
        </ListGroup>
      </div>
    );
  }
}

export default Movies;