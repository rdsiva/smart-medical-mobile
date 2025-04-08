import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * Loading overlay component to display during async operations
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Whether the loading overlay is visible
 * @param {string} props.text - Text to display below the spinner
 * @param {Object} props.style - Additional style for the container
 */
const LoadingOverlay = ({ 
  visible = false, 
  text = 'Loading...', 
  style = {} 
}) => {
  if (!visible) return null;
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#3498db" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#2c3e50',
  }
});

export default LoadingOverlay;
