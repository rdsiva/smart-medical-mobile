import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHome, FaPills, FaCalendarAlt, FaFileAlt, FaUser, FaMicrophone } from 'react-icons/fa';
import { createSelector } from 'reselect';
import AppHeader from './AppHeader';
import Navigation from './Navigation';
import '../styles/Dashboard.css';

// Memoized selectors
const selectAuth = state => state.auth;
const selectUser = createSelector(
  [selectAuth],
  auth => auth.user
);

const selectAppointmentState = state => state.appointment;
const selectAppointments = createSelector(
  [selectAppointmentState],
  appointmentState => appointmentState?.appointments || []
);

const selectMedicationState = state => state.medication;
const selectMedications = createSelector(
  [selectMedicationState],
  medicationState => medicationState?.medications || []
);

const Dashboard = () => {
  // Use memoized selectors
  const user = useSelector(selectUser);
  const appointments = useSelector(selectAppointments);
  const medications = useSelector(selectMedications);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize derived data
  const nextMedication = useMemo(() => {
    return medications.length > 0 
      ? [...medications].sort((a, b) => new Date(a.nextDose) - new Date(b.nextDose))[0] 
      : null;
  }, [medications]);
  
  const upcomingAppointment = useMemo(() => {
    return appointments.length > 0 
      ? [...appointments].sort((a, b) => new Date(a.date) - new Date(b.date))[0] 
      : null;
  }, [appointments]);
  
  const todayMedications = useMemo(() => {
    return medications.filter(med => {
      const today = new Date();
      const nextDose = new Date(med.nextDose);
      return nextDose.toDateString() === today.toDateString();
    }).length;
  }, [medications]);
  
  const upcomingAppointmentsCount = useMemo(() => {
    return appointments.filter(apt => {
      return new Date(apt.date) > new Date();
    }).length;
  }, [appointments]);

  const [isListening, setIsListening] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');

  // Voice assistant handler
  const handleVoiceAssistant = () => {
    // Show "coming soon" message instead of activating voice recognition
    setVoiceInput("Feature coming soon as audio response");
    
    // Optional: You can set a timeout to clear the message after a few seconds
    setTimeout(() => {
      setVoiceInput('');
    }, 3000);
    
    /* Original voice recognition code commented out for future implementation
    if (!isListening) {
      setIsListening(true);
      
      // Check if browser supports SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
          console.log('Voice recognition started');
        };
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setVoiceInput(transcript);
          console.log('Voice input:', transcript);
          // Here you would typically send this to your AI service
          // processVoiceCommand(transcript);
        };
        
        recognition.onerror = (event) => {
          console.error('Voice recognition error:', event.error);
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
      } else {
        alert('Voice recognition is not supported in your browser');
        setIsListening(false);
      }
    }
    */
  };

  return (
    <div className="dashboard-container">
      <AppHeader />
      
      <div className="dashboard-content">
        {/* Header with greeting */}
        <div className="dashboard-header">
          <div className="user-greeting">
            <div className="user-avatar">{user?.name?.charAt(0) || 'U'}{user?.lastName?.charAt(0) || ''}</div>
            <div className="greeting-text">
              <h2>Hello, {user?.name || 'User'}</h2>
              <p>How are you feeling today?</p>
            </div>
          </div>
        </div>
        
        {/* Rest of the component remains the same */}
        <div className="quick-access-cards">
          <Link to="/medications" className="quick-card">
            <div className="card-icon medication-icon">
              <FaPills />
            </div>
            <div className="card-title">Medications</div>
            <div className="card-count">{todayMedications} Today</div>
          </Link>
          
          <Link to="/appointments" className="quick-card">
            <div className="card-icon appointment-icon">
              <FaCalendarAlt />
            </div>
            <div className="card-title">Appointments</div>
            <div className="card-count">{upcomingAppointmentsCount} Upcoming</div>
          </Link>
          
          <Link to="/vitals" className="quick-card">
            <div className="card-icon vitals-icon">
              <span role="img" aria-label="heart">❤️</span>
            </div>
            <div className="card-title">Vitals</div>
            <div className="card-count">Check now</div>
          </Link>
        </div>
        
        {/* Next medication card - always show, even if empty */}
        <div className="info-card">
          <h3>Next Medication</h3>
          {nextMedication ? (
            <div className="medication-details">
              <div className="med-icon">
                <FaPills />
              </div>
              <div className="med-info">
                <h4>{nextMedication.name} {nextMedication.dosage}</h4>
                <p>{nextMedication.instructions}</p>
              </div>
              <div className="med-time">
                {new Date(nextMedication.nextDose).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>No medications scheduled</p>
            </div>
          )}
        </div>
        
        {/* Upcoming appointment card - always show, even if empty */}
        <div className="info-card">
          <h3>Upcoming Appointment</h3>
          {upcomingAppointment ? (
            <div className="appointment-details">
              <div className="apt-icon">
                <FaUser />
              </div>
              <div className="apt-info">
                <h4>Dr. {upcomingAppointment.doctorName}</h4>
                <p>{upcomingAppointment.purpose}</p>
              </div>
              <div className="apt-time">
                {new Date(upcomingAppointment.date).toLocaleDateString() === new Date().toLocaleDateString() 
                  ? 'Today' 
                  : new Date(upcomingAppointment.date).toLocaleDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()
                    ? 'Tomorrow'
                    : new Date(upcomingAppointment.date).toLocaleDateString()}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>No upcoming appointments</p>
            </div>
          )}
        </div>
        
        {/* AI Assistant prompt - updated to make only the icon clickable */}
        <div className="ai-assistant-prompt">
          <div 
            className={`ai-icon ${isListening ? 'listening' : ''}`} 
            onClick={handleVoiceAssistant}
          >
            {isListening ? <FaMicrophone className="pulse" /> : 'AI'}
          </div>
          <div className="ai-message">
            <h4>Ask your Medical Assistant</h4>
            {voiceInput ? (
              <p className="voice-input">"{voiceInput}"</p>
            ) : (
              <p>"How do I prepare for my appointment?"</p>
            )}
          </div>
        </div>
        
        {/* Bottom navigation - only show on mobile */}
        {isMobile && (
          <div className="bottom-nav">
            <Link to="/dashboard" className="nav-item active">
              <FaHome />
              <span>Home</span>
            </Link>
            <Link to="/medications" className="nav-item">
              <FaPills />
              <span>Meds</span>
            </Link>
            <Link to="/appointments" className="nav-item">
              <FaCalendarAlt />
              <span>Appts</span>
            </Link>
            <Link to="/medical-records" className="nav-item">
              <FaFileAlt />
              <span>Records</span>
            </Link>
            <Link to="/profile" className="nav-item">
              <FaUser />
              <span>Profile</span>
            </Link>
          </div>
        )}
        
        {/* Side navigation for desktop */}
        {!isMobile && (
          <div className="side-nav">
            <Link to="/dashboard" className="nav-item active">
              <FaHome />
              <span>Dashboard</span>
            </Link>
            <Link to="/medications" className="nav-item">
              <FaPills />
              <span>Medications</span>
            </Link>
            <Link to="/appointments" className="nav-item">
              <FaCalendarAlt />
              <span>Appointments</span>
            </Link>
            <Link to="/medical-records" className="nav-item">
              <FaFileAlt />
              <span>Medical Records</span>
            </Link>
            <Link to="/profile" className="nav-item">
              <FaUser />
              <span>Profile</span>
            </Link>
          </div>
        )}
      </div>
      
      {/* Add the Navigation component with home as active */}
      <Navigation activeItem="home" />
    </div>
  );
};

export default Dashboard;