import React from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = ({ favorites, movies }) => {
  const favoriteMovies = movies.filter(movie => favorites.includes(movie.id));

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <div className="favorites-grid">
        {favoriteMovies.map(movie => (
          <div key={movie.id} className="favorite-card">
            <Link to={`/movies/${movie.id}`}>
              <img src={movie.posterUrl} alt={movie.title} />
              <h3>{movie.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
