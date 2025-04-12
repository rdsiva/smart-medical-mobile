import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAppointments, createAppointment } from '../slices/appointmentSlice';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import ListItem from '../components/ListItem';
import Alert from '../components/Alert';
import LoadingOverlay from '../components/LoadingOverlay';
import TabBar from '../components/TabBar';
import Badge from '../components/Badge';

const Appointments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { appointments, loading, error } = useSelector(state => state.appointments);
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);
  const [provider, setProvider] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    
    const newAppointment = {
      provider,
      location,
      appointmentDate: `${date}T${time}:00`,
      reason,
      notes,
      status: 'Scheduled'
    };

    dispatch(createAppointment(newAppointment))
      .then(() => {
        setShowNewAppointmentForm(false);
        setProvider('');
        setLocation('');
        setDate('');
        setTime('');
        setReason('');
        setNotes('');
        setAlertMessage('Appointment created successfully');
        setAlertType('success');
      })
      .catch(() => {
        setAlertMessage('Failed to create appointment');
        setAlertType('error');
      });
  };

  const handleViewAppointment = (id) => {
    navigate(`/appointments/${id}`);
  };

  const getStatusBadgeType = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'primary';
      case 'Completed':
        return 'success';
      case 'Cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const filterAppointments = () => {
    if (!appointments) return [];
    
    const now = new Date();
    
    if (activeTab === 'upcoming') {
      return appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.appointmentDate);
        return appointmentDate >= now && appointment.status !== 'Cancelled';
      });
    } else if (activeTab === 'past') {
      return appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.appointmentDate);
        return appointmentDate < now || appointment.status === 'Completed';
      });
    } else {
      return appointments.filter(appointment => appointment.status === 'Cancelled');
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <div>
      <Header title="Appointments" />
      
      {alertMessage && (
        <Alert type={alertType} message={alertMessage} onClose={() => setAlertMessage('')} />
      )}
      
      <TabBar 
        tabs={[
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'past', label: 'Past' },
          { id: 'cancelled', label: 'Cancelled' }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      
      {!showNewAppointmentForm && (
        <Button 
          onClick={() => setShowNewAppointmentForm(true)} 
          type="primary"
          style={{ marginBottom: '20px' }}
        >
          Schedule New Appointment
        </Button>
      )}
      
      {showNewAppointmentForm && (
        <Card>
          <h2>Schedule New Appointment</h2>
          <form onSubmit={handleCreateAppointment}>
            <Input 
              label="Provider" 
              value={provider} 
              onChange={(e) => setProvider(e.target.value)} 
              required 
            />
            <Input 
              label="Location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              required 
            />
            <Input 
              label="Date" 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
            <Input 
              label="Time" 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              required 
            />
            <Input 
              label="Reason" 
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              required 
            />
            <Input 
              label="Notes" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              multiline 
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button onClick={() => setShowNewAppointmentForm(false)} type="secondary">Cancel</Button>
              <Button type="primary" submit>Schedule</Button>
            </div>
          </form>
        </Card>
      )}
      
      {error && <Alert type="error" message={error} />}
      
      {!loading && !error && (
        <div>
          {filterAppointments().length === 0 ? (
            <Card>
              <p>No {activeTab} appointments found.</p>
            </Card>
          ) : (
            filterAppointments().map(appointment => (
              <ListItem 
                key={appointment.id}
                title={appointment.provider}
                subtitle={formatDateTime(appointment.appointmentDate)}
                description={appointment.reason}
                rightElement={
                  <Badge type={getStatusBadgeType(appointment.status)}>
                    {appointment.status}
                  </Badge>
                }
                onClick={() => handleViewAppointment(appointment.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Appointments;
