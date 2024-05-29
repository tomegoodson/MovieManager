import React from 'react';
import './GenreFilter.css';

const GenreFilter = ({ genres, onFilter }) => {
  const handleChange = (e) => {
    console.log('Genre selected:', e.target.value); 
    onFilter(e.target.value);
  };

  return (
    <div className="genre-filter">
      <label>Filter by Genre: </label>
      <select onChange={handleChange}>
        <option value="">All</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
