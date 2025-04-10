import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUser, FaClipboardList, FaPills, FaTimes } from 'react-icons/fa';
import '../styles/SideNavigation.css';

const SideNavigation = ({ activeItem }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
  
  // Add effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    }
  };

  return (
    <>
      <div className={`side-navigation ${collapsed ? 'collapsed' : ''}`}>
        <div className="close-btn" onClick={toggleMenu}>
          <FaTimes />
        </div>
        
        <div className="nav-items">
          <div 
            className={`nav-item ${activeItem === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('/')}
          >
            <FaHome />
            <span>Home</span>
          </div>
          <div 
            className={`nav-item ${activeItem === 'appointments' ? 'active' : ''}`}
            onClick={() => handleNavigation('/appointments')}
          >
            <FaCalendarAlt />
            <span>Appointments</span>
          </div>
          <div 
            className={`nav-item ${activeItem === 'medications' ? 'active' : ''}`}
            onClick={() => handleNavigation('/medications')}
          >
            <FaPills />
            <span>Medications</span>
          </div>
          <div 
            className={`nav-item ${activeItem === 'records' ? 'active' : ''}`}
            onClick={() => handleNavigation('/records')}
          >
            <FaClipboardList />
            <span>Records</span>
          </div>
          <div 
            className={`nav-item ${activeItem === 'profile' ? 'active' : ''}`}
            onClick={() => handleNavigation('/profile')}
          >
            <FaUser />
            <span>Profile</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavigation;