import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import AddMovie from './components/AddMovie';
import GenreFilter from './components/GenreFilter';
import Favorites from './components/Favorites';
import './App.css';

const App = () => {
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then(response => response.json())
      .then(data => setMovies(data));
  }, []);

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const deleteMovie = (movieId) => {
    const updatedMovies = movies.filter(movie => movie.id !== movieId);
    setMovies(updatedMovies);
    setFavorites(favorites.filter(id => id !== movieId)); 
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
    "Biography", "Action", "Romance", "Sci-Fi",
    "War", "Musical", "Sport"
  ];

  const handlePatch= (id, currentStatus) => {
    fetch(`http://localhost:3001/movies/${id}`, {
      method: 'PATCH',
      headers:{
        'Content-Type': "application/JSON"
      },
      body: JSON.stringify({favorite: !currentStatus})
    })
    .then(response => response.json()) 
    .then(updatedMovie => {
      setMovies(movies.map(movie =>
        movie.id === id ? { ...movie, favorite: updatedMovie.favorite } : movie
      ));
    })
    .catch(error => console.error('Error updating data:', error ));
  }

  return (
    <Router>
      <div className="container">
        <Navbar setSearchQuery={setSearchQuery} />
        <GenreFilter genres={genres} onFilter={setFilter} />
        <Routes>
          <Route path="/" element={<MovieList selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} favoriteUpdate={handlePatch} toggleFavorite={toggleFavorite} movies={movies} filter={filter} searchQuery={searchQuery} deleteMovie={deleteMovie} />} />
          <Route path="/add-movie" element={<AddMovie onAdd={addMovie} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;