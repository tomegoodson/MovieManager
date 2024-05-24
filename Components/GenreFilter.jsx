import React from 'react';

const GenreFilter = ({ genres, onFilter }) => {
  return (
    <div>
      <label>Filter by Genre: </label>
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">All</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>{genre}</option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;