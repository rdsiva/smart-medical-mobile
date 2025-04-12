import React, { useState, useEffect } from 'react';
import { FaIdCard, FaFileInvoiceDollar, FaCreditCard } from 'react-icons/fa';
import AppHeader from './AppHeader';
import Navigation from './Navigation';
import '../styles/Insurance.css';
import { fetchInsuranceData } from '../services/insuranceService';

const Insurance = () => {
  const [activeTab, setActiveTab] = useState('coverage');
  const [insuranceData, setInsuranceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInsuranceData = async () => {
      try {
        setLoading(true);
        const data = await fetchInsuranceData();
        setInsuranceData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load insurance data');
        setLoading(false);
      }
    };

    getInsuranceData();
  }, []);

  if (loading) {
    return (
      <div className="insurance-container">
        <AppHeader />
        <div className="insurance-content">
          <div className="loading-state">
            <div className="spinner">Loading...</div>
          </div>
        </div>
        <Navigation activeItem="insurance" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="insurance-container">
        <AppHeader />
        <div className="insurance-content">
          <div className="error-message">{error}</div>
        </div>
        <Navigation activeItem="insurance" />
      </div>
    );
  }

  return (
    <div className="insurance-container">
      <AppHeader />
      
      <div className="insurance-content">
        <div className="insurance-header">
          <h1>Insurance</h1>
          <button className="add-btn">
            <span>+</span>
          </button>
        </div>
        
        <div className="insurance-tabs">
          <div 
            className={`tab ${activeTab === 'coverage' ? 'active' : ''}`}
            onClick={() => setActiveTab('coverage')}
          >
            Coverage
          </div>
          <div 
            className={`tab ${activeTab === 'claims' ? 'active' : ''}`}
            onClick={() => setActiveTab('claims')}
          >
            Claims
          </div>
          <div 
            className={`tab ${activeTab === 'cards' ? 'active' : ''}`}
            onClick={() => setActiveTab('cards')}
          >
            Cards
          </div>
        </div>
        
        {activeTab === 'coverage' && (
          <div className="coverage-content">
            <div className="insurance-card">
              <div className="insurance-logo">
                <span>BCBS</span>
              </div>
              <div className="insurance-details">
                <h2>{insuranceData.planName}</h2>
                <p className="plan-type">{insuranceData.planType}</p>
                <p className="member-id">Member ID: {insuranceData.memberId}</p>
                <p className="group-number">Group: {insuranceData.groupNumber}</p>
                <p className="effective-date">Effective: {insuranceData.effectiveDate}</p>
              </div>
            </div>
            
            <h2 className="section-title">Coverage Summary</h2>
            
            <div className="coverage-item">
              <div className="coverage-header">
                <h3>Individual Deductible</h3>
              </div>
              <p className="coverage-value">${insuranceData.individualDeductible.current} of ${insuranceData.individualDeductible.total}</p>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(insuranceData.individualDeductible.current / insuranceData.individualDeductible.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="coverage-item">
              <div className="coverage-header">
                <h3>Out-of-Pocket Maximum</h3>
              </div>
              <p className="coverage-value">${insuranceData.outOfPocketMax.current} of ${insuranceData.outOfPocketMax.total}</p>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(insuranceData.outOfPocketMax.current / insuranceData.outOfPocketMax.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <button className="view-details-btn">
              View Coverage Details
            </button>
          </div>
        )}
        
        {activeTab === 'claims' && (
          <div className="claims-content">
            {insuranceData.claims.length > 0 ? (
              insuranceData.claims.map((claim, index) => (
                <div className="claim-item" key={index}>
                  <div className="claim-icon">
                    <FaFileInvoiceDollar />
                  </div>
                  <div className="claim-details">
                    <h3>{claim.provider}</h3>
                    <p className="claim-date">{claim.date}</p>
                    <p className="claim-service">{claim.service}</p>
                  </div>
                  <div className="claim-amount">
                    <span className={`amount ${claim.status.toLowerCase()}`}>
                      ${claim.amount}
                    </span>
                    <span className="status">{claim.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-message">No claims available</p>
            )}
          </div>
        )}
        
        {activeTab === 'cards' && (
          <div className="cards-content">
            <div className="insurance-card-image">
              <div className="card-front">
                <div className="card-header">
                  <span className="card-logo">BCBS</span>
                  <span className="card-type">PPO</span>
                </div>
                <div className="card-body">
                  <p className="card-name">{insuranceData.cardHolder}</p>
                  <p className="card-member-id">ID: {insuranceData.memberId}</p>
                  <p className="card-group">Group: {insuranceData.groupNumber}</p>
                </div>
                <div className="card-footer">
                  <p className="card-effective">Effective: {insuranceData.effectiveDate}</p>
                </div>
              </div>
              <button className="download-card-btn">
                Download Card
              </button>
            </div>
          </div>
        )}
      </div>
      
      <Navigation activeItem="insurance" />
    </div>
  );
};

export default Insurance;