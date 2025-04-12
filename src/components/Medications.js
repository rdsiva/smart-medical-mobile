import React, { useState } from 'react';
import { FaPlus, FaPills, FaClock } from 'react-icons/fa';
import AppHeader from './AppHeader';
import Navigation from './Navigation';
import '../styles/Medications.css';

const Medications = () => {
  const [activeTab, setActiveTab] = useState('current');
  
  // Sample medication data - in a real app, this would come from an API
  const medications = [
    {
      id: 1,
      name: 'Lisinopril 10mg',
      dosage: '1 tablet',
      instructions: 'Take with food',
      time: '8:00 AM',
      status: 'taken',
      color: 'green'
    },
    {
      id: 2,
      name: 'Metformin 500mg',
      dosage: '1 tablet',
      instructions: 'Take with lunch',
      time: '12:30 PM',
      status: 'upcoming',
      color: 'blue'
    },
    {
      id: 3,
      name: 'Atorvastatin 20mg',
      dosage: '1 tablet',
      instructions: 'Take in the evening',
      time: '8:00 PM',
      status: 'upcoming',
      color: 'orange'
    }
  ];

  const renderMedicationItem = (medication) => {
    return (
      <div className="medication-item" key={medication.id}>
        <div className={`medication-indicator ${medication.color}`}></div>
        <div className="medication-icon-container">
          <div className="medication-icon">
            <FaPills />
          </div>
        </div>
        <div className="medication-details">
          <h3>{medication.name}</h3>
          <p>{medication.dosage}</p>
          <p className="medication-instructions">{medication.instructions}</p>
        </div>
        <div className="medication-time">
          <span>{medication.time}</span>
          {medication.status === 'taken' ? (
            <div className="status-icon taken">
              <span className="checkmark">✓</span>
            </div>
          ) : (
            <div className="status-icon upcoming">
              <FaClock />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="medications-container">
      <AppHeader />
      
      <div className="medications-content">
        <div className="medications-header">
          <h1>Medications</h1>
          <button className="add-medication-btn">
            <FaPlus />
          </button>
        </div>
        
        <div className="medications-tabs">
          <div 
            className={`tab ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Current
          </div>
          <div 
            className={`tab ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            Schedule
          </div>
          <div 
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </div>
        </div>
        
        {activeTab === 'current' && (
          <div className="medications-list">
            <div className="medications-day">
              <h2>Today</h2>
              {medications.map(med => renderMedicationItem(med))}
            </div>
          </div>
        )}
        
        {activeTab === 'schedule' && (
          <div className="medications-schedule">
            <p className="empty-message">No scheduled medications</p>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="medications-history">
            <p className="empty-message">No medication history</p>
          </div>
        )}
      </div>
      
      <Navigation activeItem="medications" />
    </div>
  );
};

export default Medications;