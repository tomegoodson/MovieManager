import React, { useState } from 'react';
import './MovieList.css';

const MovieList = ({ movies, filter, searchQuery, deleteMovie }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = movies.filter(movie => {
    return (!filter || movie.genres.includes(filter)) &&
           (!searchQuery || movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleKeyUp = (event, movie) => {
    if (event.key === 'Enter') {
      handleMovieClick(movie);
    }
  };

  const handleKeyDown = (event, movie) => {
    if (event.key === 'Enter') {
      handleMovieClick(movie);
    }
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  const handleModalKeyUp = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/movies/${selectedMovie.id}`, {
      method: 'DELETE'
    })
    .then(() => {
      deleteMovie(selectedMovie.id);
      handleClose();
    })
    .catch(error => console.error('Delete error:', error));
  };

  return (
    <div className="container">
      <div className="movie-grid">
        {filteredMovies.map(movie => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => handleMovieClick(movie)}
            onKeyUp={(event) => handleKeyUp(event, movie)}
            onKeyDown={(event) => handleKeyDown(event, movie)}
            tabIndex={0}
            role="button"
          >
            <img src={movie.posterUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div
          className="movie-modal"
          onKeyUp={handleModalKeyUp}
        >
          <div
            className="movie-modal-content"
          >
            <h2>{selectedMovie.title}</h2>
            <p><strong>Year:</strong> {selectedMovie.year}</p>
            <p><strong>Runtime:</strong> {selectedMovie.runtime} minutes</p>
            <p><strong>Director:</strong> {selectedMovie.director}</p>
            <p><strong>Actors:</strong> {selectedMovie.actors}</p>
            <p><strong>Plot:</strong> {selectedMovie.plot}</p>
            <div className="button-container">
              <button type="button" onClick={handleClose}>Close</button>
              <button type="button" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
