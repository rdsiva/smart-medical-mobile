import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Alert from '../../src/components/Alert';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Alert Component', () => {
  let store;
  const mockOnDismiss = jest.fn();

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  test('renders success alert correctly', () => {
    render(
      <Provider store={store}>
        <Alert 
          type="success"
          message="Operation completed successfully"
          onDismiss={mockOnDismiss}
        />
      </Provider>
    );

    expect(screen.getByText('Operation completed successfully')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument(); // Dismiss button
  });

  test('renders error alert correctly', () => {
    render(
      <Provider store={store}>
        <Alert 
          type="error"
          message="An error occurred"
          onDismiss={mockOnDismiss}
        />
      </Provider>
    );

    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });

  test('renders warning alert correctly', () => {
    render(
      <Provider store={store}>
        <Alert 
          type="warning"
          message="This is a warning message"
          onDismiss={mockOnDismiss}
        />
      </Provider>
    );

    expect(screen.getByText('This is a warning message')).toBeInTheDocument();
  });

  test('renders info alert correctly', () => {
    render(
      <Provider store={store}>
        <Alert 
          type="info"
          message="This is an informational message"
          onDismiss={mockOnDismiss}
        />
      </Provider>
    );

    expect(screen.getByText('This is an informational message')).toBeInTheDocument();
  });

  test('calls onDismiss when dismiss button is clicked', () => {
    render(
      <Provider store={store}>
        <Alert 
          type="success"
          message="Dismissible alert"
          dismissible={true}
          onDismiss={mockOnDismiss}
        />
      </Provider>
    );

    const dismissButton = screen.getByText('×');
    fireEvent.click(dismissButton);
    
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  test('does not render dismiss button when dismissible is false', () => {
    render(
      <Provider store={store}>
        <Alert 
          type="info"
          message="Non-dismissible alert"
          dismissible={false}
          onDismiss={mockOnDismiss}
        />
      </Provider>
    );

    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  test('does not render anything when message is empty', () => {
    const { container } = render(
      <Provider store={store}>
        <Alert 
          type="success"
          message=""
          onDismiss={mockOnDismiss}
        />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test('applies custom styles correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Alert 
          type="success"
          message="Styled alert"
          style={{ marginTop: 20 }}
          onDismiss={mockOnDismiss}
        />
      </Provider>
    );

    const alertElement = container.firstChild;
    expect(alertElement).toHaveStyle('margin-top: 20px');
  });
});
