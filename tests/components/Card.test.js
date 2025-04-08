import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Card from '../../src/components/Card';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Card Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('renders card with title correctly', () => {
    render(
      <Provider store={store}>
        <Card title="Test Card Title">
          <p>Card content</p>
        </Card>
      </Provider>
    );

    expect(screen.getByText('Test Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('renders card without title correctly', () => {
    render(
      <Provider store={store}>
        <Card>
          <p>Card content without title</p>
        </Card>
      </Provider>
    );

    expect(screen.queryByText('Test Card Title')).not.toBeInTheDocument();
    expect(screen.getByText('Card content without title')).toBeInTheDocument();
  });

  test('renders loading state correctly', () => {
    render(
      <Provider store={store}>
        <Card title="Loading Card" loading={true}>
          <p>This content should not be visible</p>
        </Card>
      </Provider>
    );

    expect(screen.getByText('Loading Card')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByText('This content should not be visible')).not.toBeInTheDocument();
  });

  test('applies custom styles correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Card 
          title="Styled Card" 
          style={{ backgroundColor: 'red' }}
          titleStyle={{ color: 'blue' }}
        >
          <p>Styled content</p>
        </Card>
      </Provider>
    );

    const cardElement = container.firstChild;
    expect(cardElement).toHaveStyle('background-color: red');
    
    const titleElement = screen.getByText('Styled Card');
    expect(titleElement).toHaveStyle('color: blue');
    
    expect(screen.getByText('Styled content')).toBeInTheDocument();
  });
});
