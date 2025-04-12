import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight, FaEllipsisH } from 'react-icons/fa';
import AppHeader from './AppHeader';
import Navigation from './Navigation';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    dob: '05/12/1965',
    initials: 'JD'
  };

  const handleNavigate = (path) => {
    // Navigate directly to the path
    navigate(path);
    console.log(`Navigating to ${path}`);
  };

  return (
    <div className="profile-container">
      <AppHeader />
      
      <div className="profile-content">
        <div className="profile-header">
          <h1>Profile Settings</h1>
          <button className="options-btn">
            <FaEllipsisH />
          </button>
        </div>
        
        <div className="profile-card" onClick={() => handleNavigate('/profile/personal')}>
          <div className="profile-avatar">
            <span>{user.initials}</span>
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <p className="profile-dob">DOB: {user.dob}</p>
          </div>
          <div className="chevron">
            <FaChevronRight />
          </div>
        </div>
        
        <h3 className="section-title">Account</h3>
        
        <div className="settings-item" onClick={() => handleNavigate('/profile/personal-info')}>
          <span className="item-name">Personal Information</span>
          <div className="chevron">
            <FaChevronRight />
          </div>
        </div>
        
        <div className="settings-item" onClick={() => handleNavigate('/profile/providers')}>
          <span className="item-name">Healthcare Providers</span>
          <div className="chevron">
            <FaChevronRight />
          </div>
        </div>
        
        <div className="settings-item" onClick={() => handleNavigate('/profile/family')}>
          <span className="item-name">Family Members</span>
          <div className="chevron">
            <FaChevronRight />
          </div>
        </div>
        
        <h3 className="section-title">Preferences</h3>
        
        <div className="settings-item" onClick={() => handleNavigate('/profile/notification-settings')}>
          <span className="item-name">Notifications</span>
          <div className="chevron">
            <FaChevronRight />
          </div>
        </div>
        
        <div className="settings-item" onClick={() => handleNavigate('/profile/accessibility')}>
          <span className="item-name">Accessibility</span>
          <div className="chevron">
            <FaChevronRight />
          </div>
        </div>
        
        <div className="settings-item" onClick={() => handleNavigate('/profile/insurance')}>
          <span className="item-name">Insurance</span>
          <div className="chevron">
            <FaChevronRight />
          </div>
        </div>
      </div>
      
      <Navigation activeItem="profile" />
    </div>
  );
};

export default Profile;