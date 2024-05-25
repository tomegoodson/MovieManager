import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import AddMovie from './AddMovie';
import GenreFilter from './GenreFilter';
import Favorites from './Favorites';
import { useTheme } from './ThemeContext';
import './App.css';

const App = () => {
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then(response => response.json())
      .then(data => setMovies(data));
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const deleteMovie = (movieId) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
    setFavorites(favorites.filter(id => id !== movieId)); // Remove from favorites if deleted
  };

  const toggleFavorite = (movieId) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(movieId)
        ? prevFavorites.filter(id => id !== movieId)
        : [...prevFavorites, movieId]
    );
  };

  const genres = [
    "Comedy", "Fantasy", "Crime", "Drama", "Music", "Adventure",
    "History", "Thriller", "Animation", "Family", "Mystery",
    "Biography", "Action", "Film-Noir", "Romance", "Sci-Fi",
    "War", "Western", "Horror", "Musical", "Sport"
  ];

  return (
    <Router>
      <div className={`container ${isDarkMode ? 'dark' : 'light'}`}>
        <Navbar setSearchQuery={setSearchQuery} />
        <GenreFilter genres={genres} onFilter={setFilter} />
        <Routes>
          <Route exact path="/" element={<MovieList filter={filter} searchQuery={searchQuery} deleteMovie={deleteMovie} />} />
          <Route path="/movies/:id" element={<MovieDetail onDelete={deleteMovie} toggleFavorite={toggleFavorite} favorites={favorites} />} />
          <Route path="/add-movie" element={<AddMovie onAdd={addMovie} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
