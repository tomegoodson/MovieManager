import React, { useState } from 'react';
import './MovieList.css';

const MovieList = ({ movies, filter, searchQuery, deleteMovie, toggleFavorite, setSelectedMovie, selectedMovie }) => {
  

  const filteredMovies = movies.filter(movie => {
    return (!filter || movie.genres.includes(filter)) &&
           (!searchQuery || movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(null);
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
  
  const handleFavoriteClick = (movie) => {
    fetch(`http://localhost:3001/movies/${movie.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ favorite: !movie.favorite })
    })
    .then(response => response.json())
    .then(updatedMovie => {
      toggleFavorite(movie.id, movie.favorite);
      setSelectedMovie({ ...movie, favorite: updatedMovie.favorite }); // Update the selected movie's favorite status
    })
    .catch(error => console.error('Error updating favorite status:', error));
  };

  return (
    <div className="container">
      <div className="movie-grid">
        {filteredMovies.map(movie => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => handleMovieClick(movie)}
            tabIndex={0}
            role="button"
          >
            <img src={movie.posterUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="movie-modal">
          <div className="movie-modal-content">
            <h2>
              {selectedMovie.title}
              <button onClick={() => handleFavoriteClick(selectedMovie)}>
                {selectedMovie.favorite ? 'Unfavorite' : 'Favorite'}
              </button>
            </h2>
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
