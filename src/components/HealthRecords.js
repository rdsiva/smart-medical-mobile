import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { FaFileMedical, FaFlask, FaXRay, FaFileAlt } from 'react-icons/fa';
import AppHeader from './AppHeader';
import Navigation from './Navigation';
import '../styles/HealthRecords.css';
import { fetchHealthRecords } from '../services/healthRecordsService';

const HealthRecords = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Add this line to initialize the navigate function

  useEffect(() => {
    const getHealthRecords = async () => {
      try {
        setLoading(true);
        const data = await fetchHealthRecords();
        setHealthData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load health records');
        setLoading(false);
      }
    };

    getHealthRecords();
  }, []);

  if (loading) {
    return (
      <div className="health-records-container">
        <AppHeader />
        <div className="health-records-content">
          <div className="loading-state">
            <div className="spinner">Loading...</div>
          </div>
        </div>
        <Navigation activeItem="records" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="health-records-container">
        <AppHeader />
        <div className="health-records-content">
          <div className="error-message">{error}</div>
        </div>
        <Navigation activeItem="records" />
      </div>
    );
  }

  return (
    <div className="health-records-container">
      <AppHeader />
      
      <div className="health-records-content">
        <div className="health-records-header">
          <h1>Health Records</h1>
          <button className="options-btn">
            <span className="dots">⋮</span>
          </button>
        </div>
        
        <div className="health-records-tabs">
          <div 
            className={`tab ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </div>
          <div 
            className={`tab ${activeTab === 'lab' ? 'active' : ''}`}
            onClick={() => setActiveTab('lab')}
          >
            Lab Results
          </div>
          <div 
            className={`tab ${activeTab === 'imaging' ? 'active' : ''}`}
            onClick={() => setActiveTab('imaging')}
          >
            Imaging
          </div>
          <div 
            className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </div>
        </div>
        
        {activeTab === 'summary' && (
          <div className="health-summary">
            <h2>Health Summary</h2>
            
            <div className="summary-card">
              <h3>Conditions</h3>
              {healthData.conditions.map((condition, index) => (
                <div className="summary-item" key={index}>
                  <span className="item-name">{condition.name}</span>
                  <span className="item-value">{condition.since}</span>
                </div>
              ))}
            </div>
            
            <div className="summary-card">
              <h3>Allergies</h3>
              {healthData.allergies.map((allergy, index) => (
                <div className="summary-item" key={index}>
                  <span className="item-name">{allergy.name}</span>
                  <span className={`item-value ${allergy.severity.toLowerCase()}`}>
                    {allergy.severity}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="summary-card">
              <h3>Recent Vital Signs</h3>
              {healthData.vitalSigns.map((vital, index) => (
                <div className="summary-item" key={index}>
                  <span className="item-name">{vital.name}</span>
                  <div className="vital-details">
                    <span className="item-value">{vital.value}</span>
                    <span className="item-date">{vital.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'lab' && (
          <div className="lab-results">
            <h2>Lab Results</h2>
            {healthData.labResults.length > 0 ? (
              healthData.labResults.map((lab, index) => (
                <div 
                  className="lab-item" 
                  key={index}
                  onClick={() => navigate(`/records/lab/${lab.id}`)}
                >
                  <div className="lab-icon">
                    <FaFlask />
                  </div>
                  <div className="lab-details">
                    <h3>{lab.name}</h3>
                    <p className="lab-date">{lab.date}</p>
                    <p className="lab-provider">{lab.provider}</p>
                  </div>
                  <div className="lab-status">
                    <span className={`status-badge ${lab.status.toLowerCase()}`}>
                      {lab.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-message">No lab results available</p>
            )}
          </div>
        )}
        
        {activeTab === 'imaging' && (
          <div className="imaging-results">
            <h2>Imaging</h2>
            {healthData.imaging.length > 0 ? (
              healthData.imaging.map((image, index) => (
                <div className="imaging-item" key={index}>
                  <div className="imaging-icon">
                    <FaXRay />
                  </div>
                  <div className="imaging-details">
                    <h3>{image.name}</h3>
                    <p className="imaging-date">{image.date}</p>
                    <p className="imaging-provider">{image.provider}</p>
                  </div>
                  <div className="imaging-status">
                    <span className={`status-badge ${image.status.toLowerCase()}`}>
                      {image.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-message">No imaging results available</p>
            )}
          </div>
        )}
        
        {activeTab === 'documents' && (
          <div className="documents">
            <h2>Documents</h2>
            {healthData.documents.length > 0 ? (
              healthData.documents.map((doc, index) => (
                <div className="document-item" key={index}>
                  <div className="document-icon">
                    <FaFileAlt />
                  </div>
                  <div className="document-details">
                    <h3>{doc.name}</h3>
                    <p className="document-date">{doc.date}</p>
                    <p className="document-type">{doc.type}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-message">No documents available</p>
            )}
          </div>
        )}
      </div>
      
      <Navigation activeItem="records" />
    </div>
  );
};

export default HealthRecords;