import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const MedicalRecords = () => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="medical-records-container">
      <h2>Medical Records</h2>
      <p>This page will display your medical history and records.</p>
      
      {/* Placeholder for medical records content */}
      <div className="records-placeholder">
        <p>Your medical records will appear here once connected to your healthcare provider.</p>
      </div>
    </div>
  );
};

export default MedicalRecords;