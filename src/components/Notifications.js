import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Notifications = () => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <p>View your health alerts, reminders, and notifications.</p>
      
      {/* Placeholder for notifications content */}
      <div className="notifications-placeholder">
        <p>Your notifications will appear here.</p>
      </div>
    </div>
  );
};

export default Notifications;