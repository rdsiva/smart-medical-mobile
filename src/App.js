import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Medications from './pages/Medications';
import MedicationDetail from './pages/MedicationDetail';
import Appointments from './pages/Appointments';
import AppointmentDetail from './pages/AppointmentDetail';
import AIAssistant from './pages/AIAssistant';

// Components
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          
          <Route path="/medications" element={
            <PrivateRoute>
              <Medications />
            </PrivateRoute>
          } />
          
          <Route path="/medications/:id" element={
            <PrivateRoute>
              <MedicationDetail />
            </PrivateRoute>
          } />
          
          <Route path="/appointments" element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          } />
          
          <Route path="/appointments/:id" element={
            <PrivateRoute>
              <AppointmentDetail />
            </PrivateRoute>
          } />
          
          <Route path="/ai-assistant" element={
            <PrivateRoute>
              <AIAssistant />
            </PrivateRoute>
          } />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
