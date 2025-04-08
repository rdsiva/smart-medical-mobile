import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * Card component for displaying content in a card format
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Optional card title
 * @param {boolean} props.loading - Whether to show loading indicator
 * @param {Object} props.style - Additional style for the card
 * @param {Object} props.titleStyle - Additional style for the title
 */
const Card = ({ 
  children, 
  title, 
  loading = false, 
  style = {},
  titleStyle = {}
}) => {
  return (
    <View style={[styles.card, style]}>
      {title && (
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, titleStyle]}>{title}</Text>
        </View>
      )}
      
      <View style={styles.cardContent}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#3498db" />
          </View>
        ) : (
          children
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cardContent: {
    padding: 15,
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  }
});

export default Card;
