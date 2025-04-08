import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * Button component with loading state
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Button text
 * @param {function} props.onPress - Function to call on button press
 * @param {boolean} props.loading - Whether to show loading indicator
 * @param {string} props.type - Button type (primary, secondary, danger)
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {Object} props.style - Additional style for the button
 */
const Button = ({ 
  title, 
  onPress, 
  loading = false, 
  type = 'primary', 
  disabled = false,
  style = {}
}) => {
  // Determine button style based on type
  const buttonTypeStyle = 
    type === 'primary' ? styles.primaryButton :
    type === 'secondary' ? styles.secondaryButton :
    type === 'danger' ? styles.dangerButton : styles.primaryButton;
  
  // Determine text style based on type
  const textTypeStyle = 
    type === 'primary' ? styles.primaryText :
    type === 'secondary' ? styles.secondaryText :
    type === 'danger' ? styles.dangerText : styles.primaryText;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonTypeStyle,
        disabled || loading ? styles.disabledButton : {},
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={type === 'secondary' ? '#3498db' : 'white'} 
        />
      ) : (
        <Text style={[styles.buttonText, textTypeStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#3498db',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  dangerButton: {
    backgroundColor: '#e74c3c',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#3498db',
  },
  dangerText: {
    color: 'white',
  },
});

export default Button;
