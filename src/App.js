// App.js - Main component for Smart Medical Mobile App

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Import pages and components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import HealthRecords from './components/HealthRecords';
import LabResultDetail from './components/LabResultDetail';
import Appointments from './components/Appointments';
import Medications from './components/Medications';
import Insurance from './components/Insurance';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import PersonalInfoFlow from './components/PersonalInfoFlow';
import HealthcareProviders from './components/HealthcareProviders';
import Accessibility from './components/Accessibility';
import NotificationSettings from './components/NotificationSettings';

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
            <Route path="/records" element={<HealthRecords />} />
            <Route path="/records/lab/:id" element={<LabResultDetail />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/personal-info" element={<PersonalInfoFlow />} />
            <Route path="/profile/providers" element={<HealthcareProviders />} />
            <Route path="/profile/accessibility" element={<Accessibility />} />
            <Route path="/profile/notification-settings" element={<NotificationSettings />} />
          </Routes>
        )}
        {/* Footer is removed for mobile view */}
        {window.innerWidth > 768 && <Footer />}
      </div>
    </Router>
  );
};

export default App;
