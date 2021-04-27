import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Movies extends React.Component {
  render() {
    let movieList = this.props.movieData.map((infor, index) => (
      <ListGroup.Item key={index}> {infor.title}: {infor.overview}</ListGroup.Item>
    ))
    return (
      <>
        <ListGroup>
          {movieList}
        </ListGroup>
      </>
    );
  }
}

export default Movies;