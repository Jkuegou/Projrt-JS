import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <ion-icon name="shield-checkmark-outline"></ion-icon>
          Authentication
        </Link>
        
        <div className="nav-menu">
          {user ? (
            <>
              <span className="nav-user">
                <ion-icon name="person-circle-outline"></ion-icon>
                Welcome, {user.name}
              </span>
              <button onClick={handleLogout} className="nav-button logout">
                <ion-icon name="log-out-outline"></ion-icon>
                Logout
              </button>
            </>
          ) : (
            <>
              {location.pathname !== '/login' && (
                <Link to="/login" className="nav-button">
                  <ion-icon name="log-in-outline"></ion-icon>
                  Login
                </Link>
              )}
              {location.pathname !== '/register' && (
                <Link to="/register" className="nav-button">
                  <ion-icon name="person-add-outline"></ion-icon>
                  Register
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;