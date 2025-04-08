import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Dashboard from '../../src/pages/Dashboard';
import { getProfile } from '../../src/slices/profileSlice';
import { getMedications } from '../../src/slices/medicationSlice';
import { getAppointments } from '../../src/slices/appointmentSlice';

// Mock the slice actions
jest.mock('../../src/slices/profileSlice', () => ({
  getProfile: jest.fn()
}));

jest.mock('../../src/slices/medicationSlice', () => ({
  getMedications: jest.fn()
}));

jest.mock('../../src/slices/appointmentSlice', () => ({
  getAppointments: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Dashboard Component', () => {
  let store;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const mockProfile = {
    firstName: 'John',
    lastName: 'Doe'
  };
  
  const mockMedications = [
    {
      id: '1',
      name: 'Aspirin',
      dosage: '100mg',
      frequency: 'Once daily',
      instructions: 'Take with food',
      isActive: true,
      prescribedBy: 'Dr. Smith'
    },
    {
      id: '2',
      name: 'Ibuprofen',
      dosage: '200mg',
      frequency: 'As needed',
      instructions: 'Take for pain',
      isActive: true,
      prescribedBy: 'Dr. Johnson'
    }
  ];
  
  const mockAppointments = [
    {
      id: '1',
      purpose: 'Annual Checkup',
      startTime: tomorrow.toISOString(),
      location: 'Main Hospital',
      providerName: 'Dr. Williams'
    },
    {
      id: '2',
      purpose: 'Dental Cleaning',
      startTime: new Date(today.setDate(today.getDate() + 3)).toISOString(),
      location: 'Dental Clinic',
      providerName: 'Dr. Brown'
    }
  ];

  beforeEach(() => {
    store = mockStore({
      profile: {
        profile: mockProfile,
        loading: false,
        error: null
      },
      medication: {
        medications: mockMedications,
        loading: false,
        error: null
      },
      appointment: {
        appointments: mockAppointments,
        loading: false,
        error: null
      }
    });
    
    // Clear mocks
    jest.clearAllMocks();
    
    // Mock the action creators
    getProfile.mockReturnValue({ type: 'profile/getProfile/pending' });
    getMedications.mockReturnValue({ type: 'medication/getMedications/pending' });
    getAppointments.mockReturnValue({ type: 'appointment/getAppointments/pending' });
  });

  test('renders dashboard correctly with user data', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    // Check greeting
    expect(screen.getByText('Hello, John')).toBeInTheDocument();
    expect(screen.getByText("Here's your health summary")).toBeInTheDocument();
    
    // Check sections
    expect(screen.getByText('Upcoming Medications')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Appointments')).toBeInTheDocument();
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    
    // Check medication data
    expect(screen.getByText('Aspirin')).toBeInTheDocument();
    expect(screen.getByText('100mg - Once daily')).toBeInTheDocument();
    expect(screen.getByText('Take with food')).toBeInTheDocument();
    
    // Check appointment data
    expect(screen.getByText('Annual Checkup')).toBeInTheDocument();
    expect(screen.getByText('Main Hospital')).toBeInTheDocument();
    expect(screen.getByText('With: Dr. Williams')).toBeInTheDocument();
    
    // Check quick action buttons
    expect(screen.getByText('Add Medication')).toBeInTheDocument();
    expect(screen.getByText('Schedule Appointment')).toBeInTheDocument();
    expect(screen.getByText('Talk to AI Assistant')).toBeInTheDocument();
  });

  test('fetches data on component mount', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    // Check if the actions were dispatched
    expect(getProfile).toHaveBeenCalled();
    expect(getMedications).toHaveBeenCalled();
    expect(getAppointments).toHaveBeenCalled();
  });

  test('displays empty state when no medications', () => {
    const emptyStore = mockStore({
      profile: {
        profile: mockProfile,
        loading: false,
        error: null
      },
      medication: {
        medications: [],
        loading: false,
        error: null
      },
      appointment: {
        appointments: mockAppointments,
        loading: false,
        error: null
      }
    });

    render(
      <Provider store={emptyStore}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText('No medications scheduled')).toBeInTheDocument();
  });

  test('displays empty state when no appointments', () => {
    const emptyStore = mockStore({
      profile: {
        profile: mockProfile,
        loading: false,
        error: null
      },
      medication: {
        medications: mockMedications,
        loading: false,
        error: null
      },
      appointment: {
        appointments: [],
        loading: false,
        error: null
      }
    });

    render(
      <Provider store={emptyStore}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText('No upcoming appointments')).toBeInTheDocument();
  });
});
