import React from 'react';
import AppHeader from './AppHeader';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Medications = () => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="medications-page">
      <AppHeader />
      
      {/* Rest of the component */}
      <div className="medications-content">
        <h2>Your Medications</h2>
        {/* Medications content */}
      </div>
    </div>
  );
};

export default Medications;