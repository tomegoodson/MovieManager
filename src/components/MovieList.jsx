import React, { useState } from 'react';
import './MovieList.css';

const MovieList = ({ movies, filter, searchQuery, deleteMovie }) => {
  // State to track the selected movie
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Filter movies based on genre and search query
  const filteredMovies = movies.filter(movie => {
    return (!filter || movie.genres.includes(filter)) &&
           (!searchQuery || movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  // handle movie click and set the selected movie
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // close the movie modal
  const handleClose = () => {
    setSelectedMovie(null);
  };

  // Function to handle movie deletion
  const handleDelete = () => {
    fetch(`http://localhost:3001/movies/${selectedMovie.id}`, {
      method: 'DELETE'
    })
    .then(() => {
      deleteMovie(selectedMovie.id); // Call the deleteMovie prop to update parent state
      handleClose(); // Close the modal after deletion
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
