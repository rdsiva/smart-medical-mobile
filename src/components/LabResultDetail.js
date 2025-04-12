import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShare } from 'react-icons/fa';
import '../styles/LabResultDetail.css';
import { getLabResultById } from '../services/healthRecordsService';
import AppHeader from './AppHeader';
import Navigation from './Navigation';

const LabResultDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const labResult = getLabResultById(id);

  const handleBack = () => {
    navigate('/records');
  };

  const handleShare = () => {
    console.log('Sharing lab result:', labResult.name);
    // Implement sharing functionality
  };

  const handleAskAI = () => {
    console.log('Ask AI about:', labResult.name);
    // Implement AI assistant functionality
  };

  if (!labResult) {
    return (
      <div className="lab-detail-container">
        <AppHeader />
        <div className="lab-detail-content">
          <div className="lab-detail-header">
            <button className="back-btn" onClick={handleBack}>
              <FaArrowLeft /> Back to Lab Results
            </button>
          </div>
          <div className="error-message">Lab result not found</div>
        </div>
        <Navigation activeItem="records" />
      </div>
    );
  }

  return (
    <div className="lab-detail-container">
      <AppHeader />
      
      <div className="lab-detail-content">
        <div className="lab-detail-header">
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft /> Back to Lab Results
          </button>
          <h1>{labResult.name}</h1>
        </div>

        <div className="lab-detail-card">
          <h2>Collection Date</h2>
          <p className="collection-date">{labResult.collectionDate}</p>
          <p className="provider">Provider: {labResult.provider}</p>
        </div>

        <div className="lab-detail-section">
          <h2>Results</h2>
          
          {labResult.results.map((result, index) => (
            <div className="result-item" key={index}>
              <div className="result-header">
                <h3>{result.name}</h3>
                <span className={`result-status ${result.status.toLowerCase()}`}>
                  {result.status}
                </span>
              </div>
              <div className="result-value">{result.value}</div>
              <div className="reference-range">
                Reference Range: {result.referenceRange}
              </div>
            </div>
          ))}
        </div>

        <div className="lab-detail-actions">
          <button className="share-btn" onClick={handleShare}>
            Share Results
          </button>
          <button className="ai-btn" onClick={handleAskAI}>
            Ask AI Assistant
          </button>
        </div>
      </div>
      
      <Navigation activeItem="records" />
    </div>
  );
};

export default LabResultDetail;