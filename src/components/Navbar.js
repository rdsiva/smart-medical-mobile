import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Smart Medical Assistant</Link>
      </div>
      
      <ul className="navbar-nav">
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/medical-records">Medical Records</Link>
            </li>
            <li className="nav-item">
              <Link to="/appointments">Appointments</Link>
            </li>
            <li className="nav-item">
              <Link to="/medications">Medications</Link>
            </li>
            <li className="nav-item">
              <Link to="/notifications">Notifications</Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;