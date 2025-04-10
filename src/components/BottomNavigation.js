import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaPills, FaClipboardList, FaUser } from 'react-icons/fa';
import '../styles/BottomNavigation.css';

const BottomNavigation = ({ activeItem }) => {
  const navigate = useNavigate();

  return (
    <div className="bottom-navigation">
      <div 
        className={`nav-item ${activeItem === 'home' ? 'active' : ''}`}
        onClick={() => navigate('/')}
      >
        <FaHome />
        <span>Home</span>
      </div>
      <div 
        className={`nav-item ${activeItem === 'appointments' ? 'active' : ''}`}
        onClick={() => navigate('/appointments')}
      >
        <FaCalendarAlt />
        <span>Appointments</span>
      </div>
      <div 
        className={`nav-item ${activeItem === 'medications' ? 'active' : ''}`}
        onClick={() => navigate('/medications')}
      >
        <FaPills />
        <span>Medications</span>
      </div>
      <div 
        className={`nav-item ${activeItem === 'records' ? 'active' : ''}`}
        onClick={() => navigate('/records')}
      >
        <FaClipboardList />
        <span>Records</span>
      </div>
      <div 
        className={`nav-item ${activeItem === 'profile' ? 'active' : ''}`}
        onClick={() => navigate('/profile')}
      >
        <FaUser />
        <span>Profile</span>
      </div>
    </div>
  );
};

export default BottomNavigation;