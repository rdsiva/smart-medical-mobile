import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from '../../src/pages/Login';
import { login } from '../../src/slices/authSlice';

// Mock the authSlice actions
jest.mock('../../src/slices/authSlice', () => ({
  login: jest.fn(),
  clearError: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        loading: false,
        error: null
      }
    });
    
    // Clear mocks
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getByText('Smart Medical Assistant')).toBeInTheDocument();
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('shows error message when there is an error in the store', () => {
    const errorStore = mockStore({
      auth: {
        loading: false,
        error: 'Invalid credentials'
      }
    });

    render(
      <Provider store={errorStore}>
        <Login />
      </Provider>
    );

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  test('shows loading state when submitting', () => {
    const loadingStore = mockStore({
      auth: {
        loading: true,
        error: null
      }
    });

    render(
      <Provider store={loadingStore}>
        <Login />
      </Provider>
    );

    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });

  test('calls login action when form is submitted with valid data', async () => {
    login.mockReturnValue({ type: 'auth/login/pending' });

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('Sign In'));

    // Check if login action was called with correct data
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  test('does not call login action when form is empty', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    // Submit the form without filling it
    fireEvent.click(screen.getByText('Sign In'));

    // Check that login action was not called
    expect(login).not.toHaveBeenCalled();
  });
});
