import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

/**
 * Input component for text input fields
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.value - Input value
 * @param {function} props.onChangeText - Function to call on text change
 * @param {string} props.placeholder - Input placeholder
 * @param {boolean} props.secureTextEntry - Whether to hide text (for passwords)
 * @param {string} props.keyboardType - Keyboard type
 * @param {boolean} props.multiline - Whether input is multiline
 * @param {string} props.error - Error message to display
 * @param {Object} props.style - Additional style for the input container
 * @param {Object} props.inputStyle - Additional style for the input field
 */
const Input = ({ 
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  error,
  style = {},
  inputStyle = {}
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          error && styles.inputError,
          inputStyle
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: 'white',
  },
  multilineInput: {
    height: 100,
    paddingTop: 15,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
  }
});

export default Input;
