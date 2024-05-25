import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from './2.png'; // Adjust the path to the image as necessary

const Navbar = ({ setSearchQuery }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
        <input
          type="text"
          className="navbar-search"
          placeholder="Search movies..."
          onChange={handleSearch}
        />
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/add-movie">Add Movie</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
