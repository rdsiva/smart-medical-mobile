import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaChevronRight, FaUser, FaNotesMedical, FaIdCard, FaHospital, FaFlask } from 'react-icons/fa';
import AppHeader from './AppHeader';
import Navigation from './Navigation';
import '../styles/PersonalInfoFlow.css';

const PersonalInfoFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/profile');
    }
  };
  
  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the flow
      navigate('/profile');
    }
  };
  
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <MedicalProfilesStep />;
      case 3:
        return <InsuranceDetailsStep />;
      case 4:
        return <HealthcareProvidersStep />;
      case 5:
        return <PharmaciesLabsStep />;
      default:
        return <PersonalInfoStep />;
    }
  };
  
  return (
    <div className="personal-info-flow-container">
      <AppHeader />
      
      <div className="personal-info-flow-content">
        <div className="flow-header">
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <h1>Personal Information</h1>
        </div>
        
        <div className="step-indicator">
          {[1, 2, 3, 4, 5].map(step => (
            <div 
              key={step} 
              className={`step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
              onClick={() => setCurrentStep(step)}
            >
              {step}
            </div>
          ))}
        </div>
        
        <div className="step-title">
          {currentStep === 1 && <h2><FaUser /> Basic Information</h2>}
          {currentStep === 2 && <h2><FaNotesMedical /> Medical Profile</h2>}
          {currentStep === 3 && <h2><FaIdCard /> Insurance Details</h2>}
          {currentStep === 4 && <h2><FaHospital /> Healthcare Providers</h2>}
          {currentStep === 5 && <h2><FaFlask /> Pharmacies & Labs</h2>}
        </div>
        
        {renderStepContent()}
        
        <div className="flow-actions">
          <button 
            className="secondary-btn" 
            onClick={handleBack}
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>
          <button 
            className="primary-btn" 
            onClick={handleNext}
          >
            {currentStep === 5 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
      
      <Navigation activeItem="profile" />
    </div>
  );
};

// Step 1: Personal Information
const PersonalInfoStep = () => {
  return (
    <div className="step-content">
      <div className="form-group">
        <label>First Name</label>
        <input type="text" defaultValue="John" />
      </div>
      
      <div className="form-group">
        <label>Last Name</label>
        <input type="text" defaultValue="Doe" />
      </div>
      
      <div className="form-group">
        <label>Date of Birth</label>
        <input type="date" defaultValue="1965-05-12" />
      </div>
      
      <div className="form-group">
        <label>Gender</label>
        <select defaultValue="male">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not">Prefer not to say</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Email</label>
        <input type="email" defaultValue="john.doe@example.com" />
      </div>
      
      <div className="form-group">
        <label>Phone</label>
        <input type="tel" defaultValue="(555) 123-4567" />
      </div>
      
      <div className="form-group">
        <label>Address</label>
        <input type="text" defaultValue="123 Main St" />
      </div>
      
      <div className="form-group">
        <label>City</label>
        <input type="text" defaultValue="Anytown" />
      </div>
      
      <div className="form-group">
        <label>State</label>
        <input type="text" defaultValue="CA" />
      </div>
      
      <div className="form-group">
        <label>Zip Code</label>
        <input type="text" defaultValue="12345" />
      </div>
    </div>
  );
};

// Step 2: Medical Profiles
const MedicalProfilesStep = () => {
  return (
    <div className="step-content">
      <div className="section-header">
        <h3>Medications</h3>
        <button className="add-btn">+ Add</button>
      </div>
      
      <div className="list-item">
        <div className="item-content">
          <h4>Lisinopril</h4>
          <p>10mg, Once daily</p>
        </div>
        <div className="item-action">
          <FaChevronRight />
        </div>
      </div>
      
      <div className="list-item">
        <div className="item-content">
          <h4>Metformin</h4>
          <p>500mg, Twice daily</p>
        </div>
        <div className="item-action">
          <FaChevronRight />
        </div>
      </div>
      
      <div className="section-header">
        <h3>Allergies</h3>
        <button className="add-btn">+ Add</button>
      </div>
      
      <div className="list-item">
        <div className="item-content">
          <h4>Penicillin</h4>
          <p>Severe - Anaphylaxis</p>
        </div>
        <div className="item-action">
          <FaChevronRight />
        </div>
      </div>
      
      <div className="section-header">
        <h3>Conditions</h3>
        <button className="add-btn">+ Add</button>
      </div>
      
      <div className="list-item">
        <div className="item-content">
          <h4>Hypertension</h4>
          <p>Diagnosed 2020</p>
        </div>
        <div className="item-action">
          <FaChevronRight />
        </div>
      </div>
      
      <div className="list-item">
        <div className="item-content">
          <h4>Type 2 Diabetes</h4>
          <p>Diagnosed 2022</p>
        </div>
        <div className="item-action">
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

// Step 3: Insurance Details
const InsuranceDetailsStep = () => {
  return (
    <div className="step-content">
      <div className="section-header">
        <h3>Primary Insurance</h3>
        <button className="edit-btn">Edit</button>
      </div>
      
      <div className="insurance-card">
        <div className="insurance-logo">
          <span>BCBS</span>
        </div>
        <div className="insurance-details">
          <h4>Blue Cross Blue Shield</h4>
          <p>PPO Plan</p>
          <p>Member ID: XYZ123456789</p>
          <p>Group: 987654</p>
          <p>Effective: Jan 1, 2025</p>
        </div>
      </div>
      
      <div className="section-header">
        <h3>Secondary Insurance</h3>
        <button className="add-btn">+ Add</button>
      </div>
      
      <div className="empty-state">
        <p>No secondary insurance added</p>
      </div>
    </div>
  );
};

// Step 4: Healthcare Providers
const HealthcareProvidersStep = () => {
  return (
    <div className="step-content">
      <div className="section-header">
        <h3>Primary Care</h3>
        <button className="add-btn">+ Add</button>
      </div>
      
      <div className="provider-card">
        <div className="provider-avatar">
          <span>DR</span>
        </div>
        <div className="provider-details">
          <h4>Dr. Sarah Johnson</h4>
          <p>City Medical Group</p>
          <p>(555) 987-6543</p>
          <p>Last Visit: March 15, 2025</p>
        </div>
      </div>
      
      <div className="section-header">
        <h3>Specialists</h3>
        <button className="add-btn">+ Add</button>
      </div>
      
      <div className="provider-card">
        <div className="provider-avatar">
          <span>DR</span>
        </div>
        <div className="provider-details">
          <h4>Dr. Michael Chen</h4>
          <p>Cardiology</p>
          <p>Heart Health Specialists</p>
          <p>(555) 234-5678</p>
        </div>
      </div>
      
      <div className="provider-card">
        <div className="provider-avatar">
          <span>DR</span>
        </div>
        <div className="provider-details">
          <h4>Dr. Emily Rodriguez</h4>
          <p>Endocrinology</p>
          <p>Diabetes Care Center</p>
          <p>(555) 345-6789</p>
        </div>
      </div>
    </div>
  );
};

// Step 5: Pharmacies & Labs
const PharmaciesLabsStep = () => {
  return (
    <div className="step-content">
      <div className="section-header">
        <h3>Preferred Pharmacy</h3>
        <button className="add-btn">+ Add</button>
      </div>
      
      <div className="facility-card">
        <div className="facility-icon">
          <FaFlask />
        </div>
        <div className="facility-details">
          <h4>City Pharmacy</h4>
          <p>456 Main St, Anytown, CA 12345</p>
          <p>(555) 456-7890</p>
          <p>Hours: 8am-9pm Mon-Sat, 9am-6pm Sun</p>
        </div>
      </div>
      
      <div className="section-header">
        <h3>Preferred Lab</h3>
        <button className="add-btn">+ Add</button>
      </div>
      
      <div className="facility-card">
        <div className="facility-icon">
          <FaFlask />
        </div>
        <div className="facility-details">
          <h4>LabCorp</h4>
          <p>789 Medical Plaza, Anytown, CA 12345</p>
          <p>(555) 567-8901</p>
          <p>Hours: 7am-5pm Mon-Fri</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoFlow;