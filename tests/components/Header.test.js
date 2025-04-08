import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Header from '../../src/components/Header';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Header Component', () => {
  let store;
  const mockOnBackPress = jest.fn();

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  test('renders header with title correctly', () => {
    render(
      <Provider store={store}>
        <Header 
          title="Test Header"
        />
      </Provider>
    );

    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });

  test('renders back button when showBack is true', () => {
    render(
      <Provider store={store}>
        <Header 
          title="Header with Back"
          showBack={true}
          onBackPress={mockOnBackPress}
        />
      </Provider>
    );

    const backButton = screen.getByText('←');
    expect(backButton).toBeInTheDocument();
    
    fireEvent.click(backButton);
    expect(mockOnBackPress).toHaveBeenCalledTimes(1);
  });

  test('does not render back button when showBack is false', () => {
    render(
      <Provider store={store}>
        <Header 
          title="Header without Back"
          showBack={false}
          onBackPress={mockOnBackPress}
        />
      </Provider>
    );

    expect(screen.queryByText('←')).not.toBeInTheDocument();
  });

  test('renders right component when provided', () => {
    const RightComponent = () => <button>Right Button</button>;
    
    render(
      <Provider store={store}>
        <Header 
          title="Header with Right Component"
          rightComponent={<RightComponent />}
        />
      </Provider>
    );

    expect(screen.getByText('Right Button')).toBeInTheDocument();
  });

  test('applies custom styles correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Header 
          title="Styled Header"
          style={{ backgroundColor: 'red' }}
        />
      </Provider>
    );

    const headerElement = container.firstChild;
    expect(headerElement).toHaveStyle('background-color: red');
  });
});
