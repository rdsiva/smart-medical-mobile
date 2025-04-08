import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoadingOverlay from '../../src/components/LoadingOverlay';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('LoadingOverlay Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('renders loading overlay when visible is true', () => {
    render(
      <Provider store={store}>
        <LoadingOverlay 
          visible={true}
          text="Loading data..."
        />
      </Provider>
    );

    expect(screen.getByText('Loading data...')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('does not render anything when visible is false', () => {
    const { container } = render(
      <Provider store={store}>
        <LoadingOverlay 
          visible={false}
          text="Loading data..."
        />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
    expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  test('uses default text when no text is provided', () => {
    render(
      <Provider store={store}>
        <LoadingOverlay 
          visible={true}
        />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('applies custom styles correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <LoadingOverlay 
          visible={true}
          text="Custom styled overlay"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        />
      </Provider>
    );

    const overlayElement = container.firstChild;
    expect(overlayElement).toHaveStyle('background-color: rgba(0, 0, 0, 0.8)');
  });
});
