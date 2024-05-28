import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = ({ deleteMovie, favorites, toggleFavorite }) => {
  const { id } = useParams(); // Get the movie id from the URL parameters
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [movie, setMovie] = useState(null); 

  useEffect(() => {
    fetch(`http://localhost:3001/movies/${id}`)
      .then(response => response.json())
      .then(data => setMovie(data));
  }, [id]);

  // Deelete
  const handleDelete = () => {
    fetch(`http://localhost:3001/movies/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        deleteMovie(id); // Call the deleteMovie function passed as a prop
        navigate('/'); // Navigate back to the home page
      })
      .catch(error => console.error('Delete error:', error));
  };

  // Handle toggling the favorite status of the movie
  const handleToggleFavorite = () => {
    toggleFavorite(movie.id);
  };

  const isFavorited = favorites.includes(movie?.id); // Check if the movie is in the favorites list

  return (
    movie ? (
      <div className="movie-modal">
        <div className="movie-modal-content">
          <h2>{movie.title}</h2>
          <button
            type="button"
            className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
            onClick={handleToggleFavorite}
          >
            {isFavorited ? '★' : '☆'}
          </button>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Actors:</strong> {movie.actors}</p>
          <p><strong>Plot:</strong> {movie.plot}</p>
          <div className="button-container">
            <button type="button" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
};

export default MovieDetail;
