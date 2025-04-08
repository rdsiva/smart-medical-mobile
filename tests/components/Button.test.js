import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Button from '../../src/components/Button';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Button Component', () => {
  let store;
  const mockOnPress = jest.fn();

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  test('renders primary button correctly', () => {
    render(
      <Provider store={store}>
        <Button 
          title="Primary Button" 
          onPress={mockOnPress} 
          type="primary"
        />
      </Provider>
    );

    const button = screen.getByText('Primary Button');
    expect(button).toBeInTheDocument();
    
    // Test button click
    fireEvent.click(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('renders secondary button correctly', () => {
    render(
      <Provider store={store}>
        <Button 
          title="Secondary Button" 
          onPress={mockOnPress} 
          type="secondary"
        />
      </Provider>
    );

    const button = screen.getByText('Secondary Button');
    expect(button).toBeInTheDocument();
    
    // Test button click
    fireEvent.click(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('renders danger button correctly', () => {
    render(
      <Provider store={store}>
        <Button 
          title="Danger Button" 
          onPress={mockOnPress} 
          type="danger"
        />
      </Provider>
    );

    const button = screen.getByText('Danger Button');
    expect(button).toBeInTheDocument();
    
    // Test button click
    fireEvent.click(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('renders loading state correctly', () => {
    render(
      <Provider store={store}>
        <Button 
          title="Loading Button" 
          onPress={mockOnPress} 
          loading={true}
        />
      </Provider>
    );

    // Button text should not be visible when loading
    expect(screen.queryByText('Loading Button')).not.toBeInTheDocument();
    
    // Loading indicator should be visible
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    // Button should be disabled when loading
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  test('renders disabled state correctly', () => {
    render(
      <Provider store={store}>
        <Button 
          title="Disabled Button" 
          onPress={mockOnPress} 
          disabled={true}
        />
      </Provider>
    );

    const button = screen.getByText('Disabled Button');
    
    // Button should be disabled
    fireEvent.click(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
