import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TabBar from '../../src/components/TabBar';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('TabBar Component', () => {
  let store;
  const mockOnTabPress = jest.fn();
  const mockTabs = [
    { label: 'Home' },
    { label: 'Medications' },
    { label: 'Appointments' },
    { label: 'Profile' }
  ];

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  test('renders tab bar with tabs correctly', () => {
    render(
      <Provider store={store}>
        <TabBar 
          tabs={mockTabs}
          activeTab={0}
          onTabPress={mockOnTabPress}
        />
      </Provider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Medications')).toBeInTheDocument();
    expect(screen.getByText('Appointments')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  test('highlights active tab correctly', () => {
    render(
      <Provider store={store}>
        <TabBar 
          tabs={mockTabs}
          activeTab={2}
          onTabPress={mockOnTabPress}
        />
      </Provider>
    );

    // Check that the active tab has the active class
    const activeTab = screen.getByText('Appointments').closest('div');
    expect(activeTab).toHaveClass('activeTab');
    
    // Check that other tabs don't have the active class
    const inactiveTab = screen.getByText('Home').closest('div');
    expect(inactiveTab).not.toHaveClass('activeTab');
  });

  test('calls onTabPress with correct index when tab is pressed', () => {
    render(
      <Provider store={store}>
        <TabBar 
          tabs={mockTabs}
          activeTab={0}
          onTabPress={mockOnTabPress}
        />
      </Provider>
    );

    // Click on the Medications tab (index 1)
    fireEvent.click(screen.getByText('Medications'));
    expect(mockOnTabPress).toHaveBeenCalledWith(1);
    
    // Click on the Profile tab (index 3)
    fireEvent.click(screen.getByText('Profile'));
    expect(mockOnTabPress).toHaveBeenCalledWith(3);
  });

  test('applies custom styles correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <TabBar 
          tabs={mockTabs}
          activeTab={0}
          onTabPress={mockOnTabPress}
          style={{ backgroundColor: 'black' }}
        />
      </Provider>
    );

    const tabBarElement = container.firstChild;
    expect(tabBarElement).toHaveStyle('background-color: black');
  });

  test('handles empty tabs array gracefully', () => {
    const { container } = render(
      <Provider store={store}>
        <TabBar 
          tabs={[]}
          activeTab={0}
          onTabPress={mockOnTabPress}
        />
      </Provider>
    );

    // Should render an empty tab bar
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild.children.length).toBe(0);
  });
});
