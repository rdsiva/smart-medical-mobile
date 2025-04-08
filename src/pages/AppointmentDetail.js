import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAppointmentById, updateAppointment, cancelAppointment } from '../slices/appointmentSlice';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';
import LoadingOverlay from '../components/LoadingOverlay';
import Badge from '../components/Badge';

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentAppointment, loading, error } = useSelector(state => state.appointments);
  
  const [provider, setProvider] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [reason, setReason] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');

  React.useEffect(() => {
    dispatch(getAppointmentById(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    if (currentAppointment) {
      setProvider(currentAppointment.provider || '');
      setLocation(currentAppointment.location || '');
      
      if (currentAppointment.appointmentDate) {
        const dateObj = new Date(currentAppointment.appointmentDate);
        setDate(dateObj.toISOString().split('T')[0]);
        setTime(dateObj.toTimeString().slice(0, 5));
      }
      
      setReason(currentAppointment.reason || '');
      setNotes(currentAppointment.notes || '');
      setStatus(currentAppointment.status || 'Scheduled');
    }
  }, [currentAppointment]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form
    if (currentAppointment) {
      setProvider(currentAppointment.provider || '');
      setLocation(currentAppointment.location || '');
      
      if (currentAppointment.appointmentDate) {
        const dateObj = new Date(currentAppointment.appointmentDate);
        setDate(dateObj.toISOString().split('T')[0]);
        setTime(dateObj.toTimeString().slice(0, 5));
      }
      
      setReason(currentAppointment.reason || '');
      setNotes(currentAppointment.notes || '');
      setStatus(currentAppointment.status || 'Scheduled');
    }
  };

  const handleSave = () => {
    const updatedAppointment = {
      id,
      provider,
      location,
      appointmentDate: `${date}T${time}:00`,
      reason,
      notes,
      status
    };

    dispatch(updateAppointment(updatedAppointment))
      .then(() => {
        setIsEditing(false);
        setAlertMessage('Appointment updated successfully');
        setAlertType('success');
      })
      .catch(() => {
        setAlertMessage('Failed to update appointment');
        setAlertType('error');
      });
  };

  const handleCancelAppointment = () => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(cancelAppointment(id))
        .then(() => {
          setAlertMessage('Appointment cancelled successfully');
          setAlertType('success');
          setStatus('Cancelled');
        })
        .catch(() => {
          setAlertMessage('Failed to cancel appointment');
          setAlertType('error');
        });
    }
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

  const formatDateTime = (dateString, timeString) => {
    if (!dateString) return '';
    return `${new Date(dateString).toLocaleDateString()} at ${timeString}`;
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <div>
        <Header title="Appointment Detail" />
        <Alert type="error" message={error} />
        <Button onClick={() => navigate('/appointments')}>Back to Appointments</Button>
      </div>
    );
  }

  return (
    <div>
      <Header title="Appointment Detail" />
      
      {alertMessage && (
        <Alert type={alertType} message={alertMessage} onClose={() => setAlertMessage('')} />
      )}
      
      <Card>
        {isEditing ? (
          <form>
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
            <div style={{ marginBottom: '15px' }}>
              <label>Status</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  marginTop: '5px'
                }}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button onClick={handleCancel} type="secondary">Cancel</Button>
              <Button onClick={handleSave} type="primary">Save</Button>
            </div>
          </form>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>{provider}</h2>
              <Badge type={getStatusBadgeType(status)}>{status}</Badge>
            </div>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Date & Time:</strong> {formatDateTime(date, time)}</p>
            <p><strong>Reason:</strong> {reason}</p>
            <p><strong>Notes:</strong> {notes || 'No notes'}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button onClick={() => navigate('/appointments')} type="secondary">Back</Button>
              <div>
                {status === 'Scheduled' && (
                  <>
                    <Button onClick={handleEdit} type="primary" style={{ marginRight: '10px' }}>Reschedule</Button>
                    <Button onClick={handleCancelAppointment} type="danger">Cancel Appointment</Button>
                  </>
                )}
                {status === 'Completed' && (
                  <Button onClick={handleEdit} type="primary">Edit Details</Button>
                )}
                {status === 'Cancelled' && (
                  <Button onClick={handleEdit} type="primary">Edit Details</Button>
                )}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default AppointmentDetail;
