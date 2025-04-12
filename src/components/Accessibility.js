import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import AppHeader from './AppHeader';
import Navigation from './Navigation';
import '../styles/Accessibility.css';

const Accessibility = () => {
  const navigate = useNavigate();
  const [textSize, setTextSize] = useState(50); // Default to medium (50%)
  const [contrast, setContrast] = useState('normal');
  const [voiceCommands, setVoiceCommands] = useState(true);
  const [screenReader, setScreenReader] = useState(false);

  const handleBack = () => {
    navigate('/profile');
  };

  const handleTextSizeChange = (e) => {
    setTextSize(e.target.value);
  };

  const handleContrastChange = (value) => {
    setContrast(value);
  };

  const handleVoiceCommandsToggle = () => {
    setVoiceCommands(!voiceCommands);
  };

  const handleScreenReaderToggle = () => {
    setScreenReader(!screenReader);
  };

  const getTextSizeLabel = () => {
    if (textSize < 30) return 'Small';
    if (textSize < 70) return 'Normal';
    return 'Large';
  };

  return (
    <div className="accessibility-container">
      <AppHeader />
      
      <div className="accessibility-content">
        <div className="accessibility-header">
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft /> Back to Settings
          </button>
          <h1>Accessibility</h1>
        </div>
        
        <section className="accessibility-section">
          <h2>Text Size</h2>
          <div className="text-size-control">
            <span className="text-size-small">A</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={textSize} 
              onChange={handleTextSizeChange}
              className="slider"
            />
            <span className="text-size-large">A</span>
            <span className="text-size-label">{getTextSizeLabel()}</span>
          </div>
        </section>
        
        <section className="accessibility-section">
          <h2>Contrast</h2>
          <div className="contrast-options">
            <div 
              className={`contrast-option ${contrast === 'normal' ? 'selected' : ''}`}
              onClick={() => handleContrastChange('normal')}
            >
              <div className="radio-button">
                {contrast === 'normal' && <div className="radio-button-inner"></div>}
              </div>
              <span>Normal</span>
            </div>
            
            <div 
              className={`contrast-option ${contrast === 'high' ? 'selected' : ''}`}
              onClick={() => handleContrastChange('high')}
            >
              <div className="radio-button">
                {contrast === 'high' && <div className="radio-button-inner"></div>}
              </div>
              <span>High Contrast</span>
            </div>
          </div>
        </section>
        
        <section className="accessibility-section">
          <h2>Voice Control</h2>
          <div className="toggle-option">
            <span>Enable Voice Commands</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={voiceCommands} 
                onChange={handleVoiceCommandsToggle}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </section>
        
        <section className="accessibility-section">
          <h2>Screen Reader</h2>
          <div className="toggle-option">
            <span>Screen Reader Compatible Mode</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={screenReader} 
                onChange={handleScreenReaderToggle}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </section>
        
        <button className="save-btn">Save Changes</button>
      </div>
      
      <Navigation activeItem="profile" />
    </div>
  );
};

export default Accessibility;