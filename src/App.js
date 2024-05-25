import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router';
import NavBar from './components/NavBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import AddMovie from './components/AddMovie';
import GenreFilter from './components/GenreFilter';
import './app.css';

const App = () => {
  const [filter, setFilter] = useState('');
  const [movies, setMovies] = useState([]);
  
  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  constdeleteMovie = (movieId) => {
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
        <Navbar />
        <GenreFilter genres={genres} onFilter={setFilter} />
        <Switch>
          <Route exact path="/" component={() => <MoiveList filter={filter} />} />
          <Route path="/movie/:id" component={() => <MovieDetail onDelete={deleteMovie} />} />
          <Route path="/add-movie" component={() => <AddMovie onAdd={addMovie} />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;





