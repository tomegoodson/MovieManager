import React, { useEffect, useState } from 'react';
import './MovieList.css';

const MovieList = ({ filter, searchQuery, deleteMovie }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Fetch error:', error));
  }, []);

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

  return (
    <div className="container">
      <h2>Movie List</h2>
      <div className="movie-grid">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
            <img src={movie.posterUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="movie-modal" onClick={handleClose}>
          <div className="movie-modal-content" onClick={e => e.stopPropagation()}>
            <h2>{selectedMovie.title}</h2>
            <p><strong>Year:</strong> {selectedMovie.year}</p>
            <p><strong>Runtime:</strong> {selectedMovie.runtime} minutes</p>
            <p><strong>Director:</strong> {selectedMovie.director}</p>
            <p><strong>Actors:</strong> {selectedMovie.actors}</p>
            <p><strong>Plot:</strong> {selectedMovie.plot}</p>
            <div className="button-container">
              <button onClick={handleClose}>Close</button>
              <button type="button" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
