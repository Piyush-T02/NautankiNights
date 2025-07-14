import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Navbar = ({ user, onFilterClick }) => {
  const initial = user?.email?.charAt(0).toUpperCase();

  return (
    <nav className="navbar">
      <h1>Nautanki Nights</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add">Add Event</Link>
        <button className="filter-btn" onClick={onFilterClick}>
          Filter Events
        </button>
        <div className="nav-login-slot">
          {!user ? (
            <Link to="/login" className="login-link">Login</Link>
          ) : (
            <div className="user-badge" title={user.email}>{initial}</div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
