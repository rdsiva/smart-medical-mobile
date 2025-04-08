import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ListItem from '../../src/components/ListItem';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ListItem Component', () => {
  let store;
  const mockOnPress = jest.fn();

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  test('renders list item with title and subtitle correctly', () => {
    render(
      <Provider store={store}>
        <ListItem 
          title="Item Title"
          subtitle="Item Subtitle"
          onPress={mockOnPress}
        />
      </Provider>
    );

    expect(screen.getByText('Item Title')).toBeInTheDocument();
    expect(screen.getByText('Item Subtitle')).toBeInTheDocument();
    
    // Test item click
    fireEvent.click(screen.getByText('Item Title'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('renders list item with image correctly', () => {
    render(
      <Provider store={store}>
        <ListItem 
          title="Item with Image"
          imageUrl="https://example.com/image.jpg"
          onPress={mockOnPress}
        />
      </Provider>
    );

    expect(screen.getByText('Item with Image')).toBeInTheDocument();
    
    // Check if image is rendered
    const image = document.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('renders list item with chevron correctly', () => {
    render(
      <Provider store={store}>
        <ListItem 
          title="Item with Chevron"
          chevron={true}
          onPress={mockOnPress}
        />
      </Provider>
    );

    expect(screen.getByText('Item with Chevron')).toBeInTheDocument();
    expect(screen.getByText('›')).toBeInTheDocument(); // Chevron character
  });

  test('renders list item with right component correctly', () => {
    const RightComponent = () => <button>Right Button</button>;
    
    render(
      <Provider store={store}>
        <ListItem 
          title="Item with Right Component"
          rightComponent={<RightComponent />}
          onPress={mockOnPress}
        />
      </Provider>
    );

    expect(screen.getByText('Item with Right Component')).toBeInTheDocument();
    expect(screen.getByText('Right Button')).toBeInTheDocument();
  });

  test('does not call onPress when disabled', () => {
    render(
      <Provider store={store}>
        <ListItem 
          title="Disabled Item"
          onPress={null} // No onPress handler makes it disabled
        />
      </Provider>
    );

    fireEvent.click(screen.getByText('Disabled Item'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  test('applies custom styles correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <ListItem 
          title="Styled Item"
          style={{ backgroundColor: 'lightgray' }}
          onPress={mockOnPress}
        />
      </Provider>
    );

    const listItemElement = container.firstChild;
    expect(listItemElement).toHaveStyle('background-color: lightgray');
  });
});
