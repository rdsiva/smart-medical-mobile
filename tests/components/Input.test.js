import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Input from '../../src/components/Input';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Input Component', () => {
  let store;
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  test('renders input with label correctly', () => {
    render(
      <Provider store={store}>
        <Input 
          label="Test Label"
          value="Test Value"
          onChangeText={mockOnChangeText}
          placeholder="Test Placeholder"
        />
      </Provider>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  test('handles text changes correctly', () => {
    render(
      <Provider store={store}>
        <Input 
          label="Email"
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter email"
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter email');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    
    expect(mockOnChangeText).toHaveBeenCalledWith('test@example.com');
  });

  test('renders secure text entry correctly', () => {
    render(
      <Provider store={store}>
        <Input 
          label="Password"
          value="secret123"
          onChangeText={mockOnChangeText}
          placeholder="Enter password"
          secureTextEntry={true}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'password');
  });

  test('renders multiline input correctly', () => {
    render(
      <Provider store={store}>
        <Input 
          label="Description"
          value="This is a long description that spans multiple lines"
          onChangeText={mockOnChangeText}
          placeholder="Enter description"
          multiline={true}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter description');
    expect(input).toHaveAttribute('rows', '4');
  });

  test('displays error message correctly', () => {
    render(
      <Provider store={store}>
        <Input 
          label="Username"
          value="user"
          onChangeText={mockOnChangeText}
          placeholder="Enter username"
          error="Username is too short"
        />
      </Provider>
    );

    expect(screen.getByText('Username is too short')).toBeInTheDocument();
  });

  test('applies custom styles correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Input 
          label="Styled Input"
          value="Styled value"
          onChangeText={mockOnChangeText}
          style={{ marginTop: 20 }}
          inputStyle={{ backgroundColor: 'lightgray' }}
        />
      </Provider>
    );

    const inputContainer = container.firstChild;
    expect(inputContainer).toHaveStyle('margin-top: 20px');
    
    const inputElement = screen.getByDisplayValue('Styled value');
    expect(inputElement).toHaveStyle('background-color: lightgray');
  });
});
