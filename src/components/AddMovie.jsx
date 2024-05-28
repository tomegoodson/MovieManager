import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMovie.css';

const AddMovie = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [runtime, setRuntime] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [actors, setActors] = useState('');
  const [plot, setPlot] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const navigate = useNavigate(); //  navigate    

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default submission

    const newMovie = { title, year, runtime, genre, director, actors, plot, posterUrl };

    // post request to add the new movie to the backend server
    fetch('http://localhost:3001/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMovie)
    })
      .then(response => response.json())
      .then(data => {
        onAdd(data); // onAdd function passed via props to update the parent component state
        navigate('/'); // navigate back to the home page after submission
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Year:</label>
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      <div>
        <label>Runtime:</label>
        <input type="text" value={runtime} onChange={(e) => setRuntime(e.target.value)} />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div>
        <label>Director:</label>
        <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} />
      </div>
      <div>
        <label>Actors:</label>
        <input type="text" value={actors} onChange={(e) => setActors(e.target.value)} />
      </div>
      <div>
        <label>Plot:</label>
        <textarea value={plot} onChange={(e) => setPlot(e.target.value)} />
      </div>
      <div>
        <label>Poster URL:</label>
        <input type="text" value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} />
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovie;
