import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMedicationById, updateMedication, deleteMedication } from '../slices/medicationSlice';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';
import LoadingOverlay from '../components/LoadingOverlay';

const MedicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentMedication, loading, error } = useSelector(state => state.medications);
  
  const [name, setName] = React.useState('');
  const [dosage, setDosage] = React.useState('');
  const [frequency, setFrequency] = React.useState('');
  const [instructions, setInstructions] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');

  React.useEffect(() => {
    dispatch(getMedicationById(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    if (currentMedication) {
      setName(currentMedication.name || '');
      setDosage(currentMedication.dosage || '');
      setFrequency(currentMedication.frequency || '');
      setInstructions(currentMedication.instructions || '');
      setStartDate(currentMedication.startDate ? new Date(currentMedication.startDate).toISOString().split('T')[0] : '');
      setEndDate(currentMedication.endDate ? new Date(currentMedication.endDate).toISOString().split('T')[0] : '');
    }
  }, [currentMedication]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form
    if (currentMedication) {
      setName(currentMedication.name || '');
      setDosage(currentMedication.dosage || '');
      setFrequency(currentMedication.frequency || '');
      setInstructions(currentMedication.instructions || '');
      setStartDate(currentMedication.startDate ? new Date(currentMedication.startDate).toISOString().split('T')[0] : '');
      setEndDate(currentMedication.endDate ? new Date(currentMedication.endDate).toISOString().split('T')[0] : '');
    }
  };

  const handleSave = () => {
    const updatedMedication = {
      id,
      name,
      dosage,
      frequency,
      instructions,
      startDate,
      endDate
    };

    dispatch(updateMedication(updatedMedication))
      .then(() => {
        setIsEditing(false);
        setAlertMessage('Medication updated successfully');
        setAlertType('success');
      })
      .catch(() => {
        setAlertMessage('Failed to update medication');
        setAlertType('error');
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      dispatch(deleteMedication(id))
        .then(() => {
          navigate('/medications');
        })
        .catch(() => {
          setAlertMessage('Failed to delete medication');
          setAlertType('error');
        });
    }
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <div>
        <Header title="Medication Detail" />
        <Alert type="error" message={error} />
        <Button onClick={() => navigate('/medications')}>Back to Medications</Button>
      </div>
    );
  }

  return (
    <div>
      <Header title="Medication Detail" />
      
      {alertMessage && (
        <Alert type={alertType} message={alertMessage} onClose={() => setAlertMessage('')} />
      )}
      
      <Card>
        {isEditing ? (
          <form>
            <Input 
              label="Medication Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <Input 
              label="Dosage" 
              value={dosage} 
              onChange={(e) => setDosage(e.target.value)} 
              required 
            />
            <Input 
              label="Frequency" 
              value={frequency} 
              onChange={(e) => setFrequency(e.target.value)} 
              required 
            />
            <Input 
              label="Instructions" 
              value={instructions} 
              onChange={(e) => setInstructions(e.target.value)} 
              multiline 
            />
            <Input 
              label="Start Date" 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
            <Input 
              label="End Date" 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button onClick={handleCancel} type="secondary">Cancel</Button>
              <Button onClick={handleSave} type="primary">Save</Button>
            </div>
          </form>
        ) : (
          <>
            <h2>{name}</h2>
            <p><strong>Dosage:</strong> {dosage}</p>
            <p><strong>Frequency:</strong> {frequency}</p>
            <p><strong>Instructions:</strong> {instructions}</p>
            <p><strong>Start Date:</strong> {startDate}</p>
            <p><strong>End Date:</strong> {endDate || 'Ongoing'}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button onClick={() => navigate('/medications')} type="secondary">Back</Button>
              <div>
                <Button onClick={handleEdit} type="primary" style={{ marginRight: '10px' }}>Edit</Button>
                <Button onClick={handleDelete} type="danger">Delete</Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default MedicationDetail;
