import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCalendarPlus, FaTimes, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import Navigation from './Navigation';
import { fetchAppointments, addAppointment, cancelAppointment } from '../redux/actions/appointmentActions';
import '../styles/Appointments.css';

// Mock data for appointments
const mockAppointments = [
  {
    id: '1',
    appointmentType: 'Primary Care Visit',
    purpose: 'Annual check-up',
    startTime: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), // 5 days in future
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 5)).getTime() + 30 * 60000).toISOString(), // +30 minutes
    location: 'Main Clinic, Floor 2',
    notes: 'Bring previous test results',
    providerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    providerName: 'Dr. Sarah Johnson'
  },
  {
    id: '2',
    appointmentType: 'Specialist Consultation',
    purpose: 'Cardiology follow-up',
    startTime: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString(), // 12 days in future
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 12)).getTime() + 45 * 60000).toISOString(), // +45 minutes
    location: 'Cardiology Department',
    notes: '',
    providerId: '4fa85f64-5717-4562-b3fc-2c963f66afa7',
    providerName: 'Dr. Michael Chen'
  },
  {
    id: '3',
    appointmentType: 'Follow-up',
    purpose: 'Medication review',
    startTime: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString(), // 15 days in past
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() - 15)).getTime() + 30 * 60000).toISOString(), // +30 minutes
    location: 'Main Clinic, Floor 1',
    notes: 'Discussed medication side effects',
    providerId: '5fa85f64-5717-4562-b3fc-2c963f66afa8',
    providerName: 'Dr. Emily Rodriguez'
  },
  {
    id: '4',
    appointmentType: 'Annual Physical',
    purpose: 'Complete health assessment',
    startTime: new Date(new Date().setDate(new Date().getDate() - 45)).toISOString(), // 45 days in past
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() - 45)).getTime() + 60 * 60000).toISOString(), // +60 minutes
    location: 'Wellness Center',
    notes: 'All tests completed',
    providerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    providerName: 'Dr. Sarah Johnson'
  },
  {
    id: '5',
    appointmentType: 'Specialist Consultation',
    purpose: 'Dermatology check',
    startTime: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), // 3 days in future
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 3)).getTime() + 30 * 60000).toISOString(), // +30 minutes
    location: 'Dermatology Clinic',
    notes: '',
    providerId: '5fa85f64-5717-4562-b3fc-2c963f66afa8',
    providerName: 'Dr. Emily Rodriguez'
  }
];

const Appointments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showModal, setShowModal] = useState(false);
  const [appointmentType, setAppointmentType] = useState('');
  const [provider, setProvider] = useState('');
  const [providerId, setProviderId] = useState('');
  const [purpose, setPurpose] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Get appointments and loading state from Redux store or use mock data
  const reduxState = useSelector(state => state.appointment || { appointments: [], loading: false, error: null });
  // Fix unused variable warning by removing the setter or using it
  const [localAppointments] = useState(mockAppointments);
  
  // Use either Redux appointments or mock data
  const appointments = reduxState.appointments.length > 0 ? reduxState.appointments : localAppointments;
  const loading = reduxState.loading;
  const reduxError = reduxState.error;
  
  // Fetch appointments on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Calculate date range for the next 6 months
        const today = new Date();
        const sixMonthsLater = new Date();
        sixMonthsLater.setMonth(today.getMonth() + 6);
        
        await dispatch(fetchAppointments(
          today.toISOString(),
          sixMonthsLater.toISOString()
        ));
      } catch (err) {
        console.error('Error fetching appointments:', err);
        // If API fails, we'll still have mock data
      }
    };
    
    fetchData();
  }, [dispatch]);
  
  // Filter appointments based on active tab
  const filteredAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.startTime);
    const today = new Date();
    
    if (activeTab === 'upcoming') {
      return aptDate >= today;
    } else {
      return aptDate < today;
    }
  });
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek;
    
    // Calculate total days to show (previous month days + current month days)
    const totalDays = daysFromPrevMonth + lastDay.getDate();
    
    // Calculate rows needed (7 days per row)
    const rows = Math.ceil(totalDays / 7);
    
    // Generate calendar days array
    const days = [];
    
    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = 0; i < daysFromPrevMonth; i++) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - daysFromPrevMonth + i + 1),
        isCurrentMonth: false
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month to fill the last row
    const remainingDays = rows * 7 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:30 AM', '11:45 AM',
    '1:15 PM', '2:30 PM', '3:45 PM'
  ];
  
  // Convert time string to Date object
  const timeStringToDate = (timeString, date) => {
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  };
  
  // Calculate end time (30 minutes after start time)
  const calculateEndTime = (startTime) => {
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);
    return endTime;
  };
  
  // Handle appointment confirmation
  const handleConfirmAppointment = async () => {
    if (!appointmentType || !provider || !selectedDate || !selectedTime || !purpose || !location) {
      setError('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Convert selected time to Date object
      const startTime = timeStringToDate(selectedTime, selectedDate);
      const endTime = calculateEndTime(startTime);
      
      // Prepare appointment data
      const appointmentData = {
        appointmentType,
        purpose,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        location,
        notes,
        providerId: providerId || '3fa85f64-5717-4562-b3fc-2c963f66afa6' // Use actual provider ID or fallback
      };
      
      // Dispatch action to add appointment
      await dispatch(addAppointment(appointmentData));
      
      // Close modal and reset form
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError('Failed to schedule appointment. Please try again.');
      console.error('Error scheduling appointment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle appointment cancellation
  const handleCancelAppointment = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await dispatch(cancelAppointment(id));
      } catch (err) {
        console.error('Error cancelling appointment:', err);
        alert('Failed to cancel appointment. Please try again.');
      }
    }
  };
  
  // Reset form fields
  const resetForm = () => {
    setAppointmentType('');
    setProvider('');
    setProviderId('');
    setPurpose('');
    setLocation('');
    setNotes('');
    setSelectedDate(null);
    setSelectedTime('');
    setError(null);
  };
  
  // Format date for display
  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };
  
  // Format time for display
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };
  
  // Check if a date is selected
  const isSelected = (date) => {
    if (!selectedDate) return false;
    
    return date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Handle provider selection
  const handleProviderChange = (e) => {
    const selectedProvider = e.target.value;
    setProvider(selectedProvider);
    
    // Set provider ID based on selection (in a real app, you'd have a mapping of names to IDs)
    switch(selectedProvider) {
      case 'Dr. Sarah Johnson':
        setProviderId('3fa85f64-5717-4562-b3fc-2c963f66afa6');
        break;
      case 'Dr. Michael Chen':
        setProviderId('4fa85f64-5717-4562-b3fc-2c963f66afa7');
        break;
      case 'Dr. Emily Rodriguez':
        setProviderId('5fa85f64-5717-4562-b3fc-2c963f66afa8');
        break;
      default:
        setProviderId('');
    }
  };
  
  // Update the return statement in the Appointments component to include proper spacing
  return (
    <div className="appointments-container">
      <AppHeader />
      
      {/* Main content */}
      <div className="appointments-content">
        <div className="appointments-header">
          <h1>Appointments</h1>
          <button className="schedule-btn" onClick={() => setShowModal(true)}>
            <FaCalendarPlus />
            <span>Schedule</span>
          </button>
        </div>
        
        <div className="appointments-tabs">
          <div 
            className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </div>
          <div 
            className={`tab ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </div>
        </div>
        
        {reduxError && (
          <div className="error-message global-error">
            Failed to load appointments. Please try again later.
          </div>
        )}
        
        <div className="appointments-list">
          {loading ? (
            <div className="loading-state">
              <FaSpinner className="spinner" />
              <p>Loading appointments...</p>
            </div>
          ) : filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <div className="appointment-card" key={appointment.id}>
                <div className="appointment-header">
                  <div className="appointment-date">
                    {formatDate(appointment.startTime)}
                  </div>
                  <div className={`appointment-status ${
                    new Date(appointment.startTime) > new Date() 
                      ? 'status-upcoming' 
                      : 'status-completed'
                  }`}>
                    {new Date(appointment.startTime) > new Date() ? 'Upcoming' : 'Completed'}
                  </div>
                </div>
                <div className="appointment-details">
                  <div className="doctor-avatar">
                    {appointment.providerName ? appointment.providerName.charAt(0) : 'D'}
                  </div>
                  <div className="appointment-info">
                    <h3>{appointment.providerName || 'Doctor'}</h3>
                    <p>{appointment.purpose || appointment.appointmentType}</p>
                    <p className="appointment-time">{formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}</p>
                    <p className="appointment-location">{appointment.location}</p>
                  </div>
                </div>
                {new Date(appointment.startTime) > new Date() && (
                  <div className="appointment-actions">
                    <button className="action-btn">Reschedule</button>
                    <button 
                      className="action-btn cancel"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <FaCalendarAlt />
              <h3>No {activeTab} appointments</h3>
              <p>
                {activeTab === 'upcoming' 
                  ? 'Schedule an appointment to get started' 
                  : 'Your past appointments will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Schedule Appointment Modal */}
      {showModal && (
        <div className="appointment-modal">
          <div className="modal-header">
            <h2>Schedule Appointment</h2>
            <button className="close-btn" onClick={() => {
              setShowModal(false);
              resetForm();
            }}>
              <FaTimes />
            </button>
          </div>
          <div className="modal-content">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">Appointment Type *</label>
              <select 
                className="form-control dropdown-control"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                required
              >
                <option value="">Select type</option>
                <option value="Primary Care Visit">Primary Care Visit</option>
                <option value="Specialist Consultation">Specialist Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Annual Physical">Annual Physical</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Purpose *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Brief description of visit"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Healthcare Provider *</label>
              <select 
                className="form-control dropdown-control"
                value={provider}
                onChange={handleProviderChange}
                required
              >
                <option value="">Select provider</option>
                <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Location *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Clinic location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Date *</label>
              <div className="calendar-container">
                <div className="calendar-header">
                  <div className="calendar-month">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                  <div className="calendar-nav">
                    <button className="calendar-nav-btn" onClick={prevMonth}>
                      <FaChevronLeft />
                    </button>
                    <button className="calendar-nav-btn" onClick={nextMonth}>
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
                
                <div className="calendar-grid">
                  {/* Day headers */}
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div className="calendar-day-header" key={index}>
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {generateCalendarDays().map((day, index) => (
                    <div 
                      key={index}
                      className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${
                        isToday(day.date) ? 'today' : ''
                      } ${isSelected(day.date) ? 'selected' : ''}`}
                      onClick={() => setSelectedDate(day.date)}
                    >
                      {day.date.getDate()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {selectedDate && (
              <div className="form-group">
                <div className="time-slots-label">
                  Available Times on {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </div>
                <div className="time-slots-grid">
                  {timeSlots.map((time, index) => (
                    <div 
                      key={index}
                      className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
                </div>
              )}
            
            <div className="form-group">
              <label className="form-label">Notes (Optional)</label>
              <textarea
                className="form-control"
                placeholder="Any additional information"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              ></textarea>
            </div>
            
            <button 
              className={`confirm-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting || !appointmentType || !provider || !selectedDate || !selectedTime || !purpose || !location}
              onClick={handleConfirmAppointment}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="spinner" />
                  <span>Scheduling...</span>
                </>
              ) : (
                'Confirm Appointment'
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Add Navigation component */}
      <Navigation activeItem="appointments" />
    </div>
  );
};

export default Appointments;