import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Alert component for displaying success, error, warning, or info messages
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Alert type (success, error, warning, info)
 * @param {string} props.message - Alert message
 * @param {boolean} props.dismissible - Whether the alert can be dismissed
 * @param {function} props.onDismiss - Function to call when alert is dismissed
 * @param {Object} props.style - Additional style for the alert
 */
const Alert = ({ 
  type = 'info', 
  message, 
  dismissible = true,
  onDismiss,
  style = {} 
}) => {
  if (!message) return null;
  
  // Determine alert style based on type
  const alertTypeStyle = 
    type === 'success' ? styles.successAlert :
    type === 'error' ? styles.errorAlert :
    type === 'warning' ? styles.warningAlert : 
    styles.infoAlert;
  
  // Determine text style based on type
  const textTypeStyle = 
    type === 'success' ? styles.successText :
    type === 'error' ? styles.errorText :
    type === 'warning' ? styles.warningText : 
    styles.infoText;
  
  return (
    <View style={[styles.container, alertTypeStyle, style]}>
      <Text style={[styles.message, textTypeStyle]}>{message}</Text>
      
      {dismissible && onDismiss && (
        <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
          <Text style={[styles.dismissText, textTypeStyle]}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  successAlert: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    borderLeftWidth: 4,
    borderLeftColor: '#2ecc71',
  },
  errorAlert: {
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  warningAlert: {
    backgroundColor: 'rgba(241, 196, 15, 0.2)',
    borderLeftWidth: 4,
    borderLeftColor: '#f1c40f',
  },
  infoAlert: {
    backgroundColor: 'rgba(52, 152, 219, 0.2)',
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  message: {
    flex: 1,
    fontSize: 14,
  },
  successText: {
    color: '#27ae60',
  },
  errorText: {
    color: '#c0392b',
  },
  warningText: {
    color: '#f39c12',
  },
  infoText: {
    color: '#2980b9',
  },
  dismissButton: {
    marginLeft: 10,
  },
  dismissText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default Alert;
