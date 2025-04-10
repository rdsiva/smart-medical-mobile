// App.js - Main component for Smart Medical Mobile App

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Import pages and components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import MedicalRecords from './components/MedicalRecords';
import Appointments from './components/Appointments';
import Medications from './components/Medications';
import Notifications from './components/Notifications';
import Profile from './components/Profile';

import Footer from './components/Footer';

// Import actions
import { checkAuthStatus } from './slices/authSlice';

// Import styles
import './styles/App.css';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        )}
        {/* Footer is removed for mobile view */}
        {window.innerWidth > 768 && <Footer />}
      </div>
    </Router>
  );
};

export default App;
