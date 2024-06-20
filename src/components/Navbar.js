// src/components/Navbar.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NewsContext } from '../components/context/NewsContext'; // Update the import path if necessary
import './navbar.css'; // Import the CSS file

const Navbar = () => {
  const { setSelectedCategory } = useContext(NewsContext);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={() => handleCategoryChange('general')}>
          <b>News-App</b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => handleCategoryChange('general')}>
                General
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/business" onClick={() => handleCategoryChange('business')}>
                Business
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/technology" onClick={() => handleCategoryChange('technology')}>
                Technology
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/entertainment" onClick={() => handleCategoryChange('entertainment')}>
                Entertainment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
