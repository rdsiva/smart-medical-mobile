import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaSearch } from 'react-icons/fa';
import AppHeader from './AppHeader';
import Navigation from './Navigation';
import '../styles/HealthcareProviders.css';

const HealthcareProviders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for healthcare providers
  const providers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Primary Care',
      facility: 'City Medical Group',
      phone: '(555) 987-6543',
      lastVisit: 'March 15, 2025',
      image: null
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      facility: 'Heart Health Specialists',
      phone: '(555) 234-5678',
      lastVisit: 'February 10, 2025',
      image: null
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Endocrinology',
      facility: 'Diabetes Care Center',
      phone: '(555) 345-6789',
      lastVisit: 'January 20, 2025',
      image: null
    }
  ];
  
  const handleBack = () => {
    navigate('/profile');
  };
  
  const handleAddProvider = () => {
    // Implement add provider functionality
    console.log('Add provider');
  };
  
  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.facility.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="providers-container">
      <AppHeader />
      
      <div className="providers-content">
        <div className="providers-header">
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <h1>Healthcare Providers</h1>
          <button className="add-btn" onClick={handleAddProvider}>
            <FaPlus />
          </button>
        </div>
        
        <div className="search-container">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="providers-list">
          {filteredProviders.length > 0 ? (
            filteredProviders.map(provider => (
              <div className="provider-card" key={provider.id}>
                <div className="provider-avatar">
                  <span>{provider.name.charAt(0)}</span>
                </div>
                <div className="provider-details">
                  <h3>{provider.name}</h3>
                  <p className="provider-specialty">{provider.specialty}</p>
                  <p className="provider-facility">{provider.facility}</p>
                  <p className="provider-phone">{provider.phone}</p>
                  {provider.lastVisit && (
                    <p className="provider-last-visit">Last Visit: {provider.lastVisit}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No providers found</p>
              <button className="add-provider-btn" onClick={handleAddProvider}>
                Add Provider
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Navigation activeItem="profile" />
    </div>
  );
};

export default HealthcareProviders;