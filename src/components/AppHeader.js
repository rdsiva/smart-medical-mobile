import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBell, FaUserCog, FaKey, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../slices/authSlice';
import '../styles/AppHeader.css';

const AppHeader = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const closeMenu = () => {
    setShowUserMenu(false);
  };

  return (
    <div className="app-header">
      <div className="app-logo-section">
        <Link to="/dashboard" className="app-logo-link">
          <div className="app-logo">SMA</div>
          <h1 className="app-title">Smart Medical Assistant</h1>
        </Link>
      </div>
      <div className="user-section">
        <div className="notification-icon">
          <Link to="/notifications">
            <FaBell />
          </Link>
        </div>
        <div className="user-menu-container">
          <div 
            className="user-icon" 
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            {user?.name?.charAt(0) || 'U'}{user?.lastName?.charAt(0) || ''}
          </div>
          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-info">
                <h3>{user?.name} {user?.lastName}</h3>
                <p>{user?.email}</p>
              </div>
              <ul className="user-menu-items">
                <li>
                  <Link to="/profile" onClick={closeMenu}>
                    <FaUserCog /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/change-password" onClick={closeMenu}>
                    <FaKey /> Change Password
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppHeader;