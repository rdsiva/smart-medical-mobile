import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaPrescriptionBottleAlt, FaFileAlt, FaUser, FaIdCard } from 'react-icons/fa';
import '../styles/Navigation.css';

const Navigation = ({ activeItem }) => {
  return (
    <div className="navigation-container">
      <Link to="/dashboard" className={`nav-item ${activeItem === 'dashboard' ? 'active' : ''}`}>
        <FaHome className="nav-icon" />
        <span className="nav-label">Home</span>
      </Link>
      <Link to="/appointments" className={`nav-item ${activeItem === 'appointments' ? 'active' : ''}`}>
        <FaCalendarAlt className="nav-icon" />
        <span className="nav-label">Appointments</span>
      </Link>
      <Link to="/medications" className={`nav-item ${activeItem === 'medications' ? 'active' : ''}`}>
        <FaPrescriptionBottleAlt className="nav-icon" />
        <span className="nav-label">Medications</span>
      </Link>
      <Link to="/records" className={`nav-item ${activeItem === 'records' ? 'active' : ''}`}>
        <FaFileAlt className="nav-icon" />
        <span className="nav-label">Records</span>
      </Link>
      <Link to="/insurance" className={`nav-item ${activeItem === 'insurance' ? 'active' : ''}`}>
        <FaIdCard className="nav-icon" />
        <span className="nav-label">Insurance</span>
      </Link>
      <Link to="/profile" className={`nav-item ${activeItem === 'profile' ? 'active' : ''}`}>
        <FaUser className="nav-icon" />
        <span className="nav-label">Profile</span>
      </Link>
    </div>
  );
};

export default Navigation;