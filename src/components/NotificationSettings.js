import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import AppHeader from './AppHeader';
import Navigation from './Navigation';
import '../styles/NotificationSettings.css';

const NotificationSettings = () => {
  const navigate = useNavigate();
  const [notificationPreferences, setNotificationPreferences] = useState({
    appointments: {
      email: true,
      sms: true,
      push: true
    },
    medications: {
      email: false,
      sms: true,
      push: true
    },
    labResults: {
      email: true,
      sms: false,
      push: true
    },
    healthReminders: {
      email: true,
      sms: false,
      push: false
    }
  });

  const handleBack = () => {
    navigate('/profile');
  };

  const handleToggle = (category, channel) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [category]: {
        ...notificationPreferences[category],
        [channel]: !notificationPreferences[category][channel]
      }
    });
  };

  const handleSave = () => {
    // Save notification preferences to backend
    console.log('Saving notification preferences:', notificationPreferences);
    // Show success message
    alert('Notification preferences saved successfully!');
    // Navigate back to profile
    navigate('/profile');
  };

  return (
    <div className="notification-settings-container">
      <AppHeader />
      
      <div className="notification-settings-content">
        <div className="notification-settings-header">
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft /> Back to Settings
          </button>
          <h1>Notifications</h1>
        </div>
        
        <div className="notification-intro">
          <p>Choose how you want to receive notifications. You can enable or disable notifications for different categories.</p>
        </div>
        
        <div className="notification-categories">
          <div className="category-header">
            <div className="category-name">Category</div>
            <div className="channel-headers">
              <div className="channel-header">Email</div>
              <div className="channel-header">SMS</div>
              <div className="channel-header">Push</div>
            </div>
          </div>
          
          <div className="category-item">
            <div className="category-name">Appointments</div>
            <div className="channel-toggles">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationPreferences.appointments.email} 
                  onChange={() => handleToggle('appointments', 'email')}
                />
                <span className="toggle-slider"></span>
              </label>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationPreferences.appointments.sms} 
                  onChange={() => handleToggle('appointments', 'sms')}
                />
                <span className="toggle-slider"></span>
              </label>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationPreferences.appointments.push} 
                  onChange={() => handleToggle('appointments', 'push')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div className="category-item">
            <div className="category-name">Medications</div>
            <div className="channel-toggles">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationPreferences.medications.email} 
                  onChange={() => handleToggle('medications', 'email')}
                />
                <span className="toggle-slider"></span>
              </label>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationPreferences.medications.sms} 
                  onChange={() => handleToggle('medications', 'sms')}
                />
                <span className="toggle-slider"></span>
              </label>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationPreferences.medications.push} 
                  onChange={() => handleToggle('medications', 'push')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div className="category-item">
            <div className="category-name">Lab Results</div>
            <div className="channel-toggles">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationPreferences.labResults.email} 
                  onChange={() => handleToggle('labResults', 'email')}
                />
                <span className="toggle-slider"></span>
              </label>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationPreferences.labResults.sms} 
                  onChange={() => handleToggle('labResults', 'sms')}
                />
                <span className="toggle-slider"></span>
              </label>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationPreferences.labResults.push} 
                  onChange={() => handleToggle('labResults', 'push')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div className="category-item">
            <div className="category-name">Health Reminders</div>
            <div className="channel-toggles">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationPreferences.healthReminders.email} 
                  onChange={() => handleToggle('healthReminders', 'email')}
                />
                <span className="toggle-slider"></span>
              </label>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationPreferences.healthReminders.sms} 
                  onChange={() => handleToggle('healthReminders', 'sms')}
                />
                <span className="toggle-slider"></span>
              </label>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationPreferences.healthReminders.push} 
                  onChange={() => handleToggle('healthReminders', 'push')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="contact-info-section">
          <h2>Contact Information</h2>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" defaultValue="john.doe@example.com" />
          </div>
          <div className="form-group">
            <label>Phone Number (for SMS)</label>
            <input type="tel" defaultValue="(555) 123-4567" />
          </div>
        </div>
        
        <button className="save-btn" onClick={handleSave}>Save Preferences</button>
      </div>
      
      <Navigation activeItem="profile" />
    </div>
  );
};

export default NotificationSettings;