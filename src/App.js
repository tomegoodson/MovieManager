import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import AddMovie from './AddMovie';
import GenreFilter from './GenreFilter';
import './App.css';

const App = () => {
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const deleteMovie = (movieId) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  const genres = [
    "Comedy", "Fantasy", "Crime", "Drama", "Music", "Adventure",
    "History", "Thriller", "Animation", "Family", "Mystery",
    "Biography", "Action", "Film-Noir", "Romance", "Sci-Fi",
    "War", "Western", "Horror", "Musical", "Sport"
  ];

  return (
    <Router>
      <div>
        <Navbar setSearchQuery={setSearchQuery} />
        <GenreFilter genres={genres} onFilter={setFilter} />
        <Routes>
          <Route exact path="/" element={<MovieList filter={filter} searchQuery={searchQuery} deleteMovie={deleteMovie} />} />
          <Route path="/movies/:id" element={<MovieDetail onDelete={deleteMovie} />} />
          <Route path="/add-movie" element={<AddMovie onAdd={addMovie} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
