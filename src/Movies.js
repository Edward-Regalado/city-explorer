import React from 'react';
import Movie from './Movie';
import ListGroup from 'react-bootstrap/ListGroup';

class Movies extends React.Component {
  render() {
    let movies = this.props.movieData.map((infor, index) => (
      <Movie key={index} title={infor.title} overview={infor.overview} image_url={infor.image_url} />
    ))
    return (
      <>
        <ListGroup>
          {movies}
        </ListGroup>
      </>
    );
  }
}

export default Movies;