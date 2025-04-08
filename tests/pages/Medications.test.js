import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Medications from '../../src/pages/Medications';
import { getMedications, getMedication } from '../../src/slices/medicationSlice';

// Mock the slice actions
jest.mock('../../src/slices/medicationSlice', () => ({
  getMedications: jest.fn(),
  getMedication: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Medications Component', () => {
  let store;
  
  const mockMedications = [
    {
      id: '1',
      name: 'Aspirin',
      dosage: '100mg',
      frequency: 'Once daily',
      instructions: 'Take with food',
      isActive: true,
      prescribedBy: 'Dr. Smith',
      startDate: '2025-03-01T00:00:00.000Z',
      endDate: '2025-06-01T00:00:00.000Z'
    },
    {
      id: '2',
      name: 'Ibuprofen',
      dosage: '200mg',
      frequency: 'As needed',
      instructions: 'Take for pain',
      isActive: true,
      prescribedBy: 'Dr. Johnson',
      startDate: '2025-02-15T00:00:00.000Z',
      endDate: null
    },
    {
      id: '3',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      instructions: 'Take in the morning',
      isActive: false,
      prescribedBy: 'Dr. Williams',
      startDate: '2025-01-10T00:00:00.000Z',
      endDate: '2025-03-10T00:00:00.000Z'
    }
  ];

  beforeEach(() => {
    store = mockStore({
      medication: {
        medications: mockMedications,
        loading: false,
        error: null
      }
    });
    
    // Clear mocks
    jest.clearAllMocks();
    
    // Mock the action creators
    getMedications.mockReturnValue({ type: 'medication/getMedications/pending' });
    getMedication.mockReturnValue({ type: 'medication/getMedication/pending' });
  });

  test('renders medications list correctly', () => {
    render(
      <Provider store={store}>
        <Medications />
      </Provider>
    );

    // Check header
    expect(screen.getByText('My Medications')).toBeInTheDocument();
    
    // Check search input
    expect(screen.getByPlaceholderText('Search medications...')).toBeInTheDocument();
    
    // Check medication cards
    expect(screen.getByText('Aspirin')).toBeInTheDocument();
    expect(screen.getByText('Ibuprofen')).toBeInTheDocument();
    expect(screen.getByText('Lisinopril')).toBeInTheDocument();
    
    // Check medication details
    expect(screen.getByText('Dosage: 100mg')).toBeInTheDocument();
    expect(screen.getByText('Frequency: Once daily')).toBeInTheDocument();
    expect(screen.getByText('Prescribed by: Dr. Smith')).toBeInTheDocument();
    
    // Check status badges
    expect(screen.getAllByText('Active').length).toBe(2);
    expect(screen.getByText('Inactive')).toBeInTheDocument();
    
    // Check add button
    expect(screen.getByText('+ Add Medication')).toBeInTheDocument();
  });

  test('fetches medications on component mount', () => {
    render(
      <Provider store={store}>
        <Medications />
      </Provider>
    );

    // Check if the action was dispatched
    expect(getMedications).toHaveBeenCalled();
  });

  test('filters medications based on search query', () => {
    render(
      <Provider store={store}>
        <Medications />
      </Provider>
    );

    // Initially all medications are visible
    expect(screen.getByText('Aspirin')).toBeInTheDocument();
    expect(screen.getByText('Ibuprofen')).toBeInTheDocument();
    expect(screen.getByText('Lisinopril')).toBeInTheDocument();
    
    // Enter search query
    fireEvent.change(screen.getByPlaceholderText('Search medications...'), {
      target: { value: 'aspirin' }
    });
    
    // Only Aspirin should be visible now
    expect(screen.getByText('Aspirin')).toBeInTheDocument();
    expect(screen.queryByText('Ibuprofen')).not.toBeInTheDocument();
    expect(screen.queryByText('Lisinopril')).not.toBeInTheDocument();
  });

  test('displays loading state when loading', () => {
    const loadingStore = mockStore({
      medication: {
        medications: [],
        loading: true,
        error: null
      }
    });

    render(
      <Provider store={loadingStore}>
        <Medications />
      </Provider>
    );

    // Check for loading indicator
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    const errorStore = mockStore({
      medication: {
        medications: [],
        loading: false,
        error: 'Failed to fetch medications'
      }
    });

    render(
      <Provider store={errorStore}>
        <Medications />
      </Provider>
    );

    // Check for error message
    expect(screen.getByText('Failed to fetch medications')).toBeInTheDocument();
  });

  test('displays empty state when no medications', () => {
    const emptyStore = mockStore({
      medication: {
        medications: [],
        loading: false,
        error: null
      }
    });

    render(
      <Provider store={emptyStore}>
        <Medications />
      </Provider>
    );

    // Check for empty state message
    expect(screen.getByText('No medications added yet')).toBeInTheDocument();
  });

  test('displays empty search results message when no matches', () => {
    render(
      <Provider store={store}>
        <Medications />
      </Provider>
    );

    // Enter search query that won't match any medications
    fireEvent.change(screen.getByPlaceholderText('Search medications...'), {
      target: { value: 'nonexistent' }
    });
    
    // Check for empty search results message
    expect(screen.getByText('No medications match your search')).toBeInTheDocument();
  });
});
