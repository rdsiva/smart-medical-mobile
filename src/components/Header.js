import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Header component for page headers with optional back button
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Header title
 * @param {function} props.onBackPress - Function to call when back button is pressed
 * @param {boolean} props.showBack - Whether to show back button
 * @param {React.ReactNode} props.rightComponent - Optional component to display on the right side
 * @param {Object} props.style - Additional style for the header
 */
const Header = ({ 
  title, 
  onBackPress, 
  showBack = false,
  rightComponent,
  style = {}
}) => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBackPress}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3498db',
    paddingHorizontal: 15,
  },
  leftContainer: {
    width: 40,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: 'white',
  }
});

export default Header;
