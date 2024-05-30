import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = ({ deleteMovie, favorites, toggleFavorite, setSelectedMovie }) => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [movie, setMovie] = useState(null); 

  useEffect(() => {
    fetch(`http://localhost:3001/movies/${id}`)
      .then(response => response.json())
      .then(data => setMovie(data));
  }, [id]);

  
  const handleDelete = () => {
    fetch(`http://localhost:3001/movies/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        deleteMovie(id); 
        navigate('/'); 
      })
      .catch(error => console.error('Delete error:', error));
  };

  const handleToggleFavorite = () => {
    toggleFavorite(movie.id);
  };

  const isFavorited = favorites.includes(movie?.id); 
console.log(isFavorited)

  return (<div>Movie-Details</div>
  );
};

export default MovieDetail;
