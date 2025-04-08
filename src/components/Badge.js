import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Badge component for displaying status indicators
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - Badge text
 * @param {string} props.type - Badge type (primary, success, warning, danger, info)
 * @param {Object} props.style - Additional style for the badge
 * @param {Object} props.textStyle - Additional style for the badge text
 */
const Badge = ({ 
  text,
  type = 'primary',
  style = {},
  textStyle = {}
}) => {
  // Determine badge style based on type
  const badgeTypeStyle = 
    type === 'primary' ? styles.primaryBadge :
    type === 'success' ? styles.successBadge :
    type === 'warning' ? styles.warningBadge :
    type === 'danger' ? styles.dangerBadge :
    type === 'info' ? styles.infoBadge : 
    styles.primaryBadge;
  
  // Determine text style based on type
  const textTypeStyle = 
    type === 'primary' ? styles.primaryText :
    type === 'success' ? styles.successText :
    type === 'warning' ? styles.warningText :
    type === 'danger' ? styles.dangerText :
    type === 'info' ? styles.infoText : 
    styles.primaryText;
  
  return (
    <View style={[styles.badge, badgeTypeStyle, style]}>
      <Text style={[styles.text, textTypeStyle, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  primaryBadge: {
    backgroundColor: 'rgba(52, 152, 219, 0.2)',
  },
  successBadge: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
  },
  warningBadge: {
    backgroundColor: 'rgba(241, 196, 15, 0.2)',
  },
  dangerBadge: {
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
  },
  infoBadge: {
    backgroundColor: 'rgba(149, 165, 166, 0.2)',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  primaryText: {
    color: '#2980b9',
  },
  successText: {
    color: '#27ae60',
  },
  warningText: {
    color: '#f39c12',
  },
  dangerText: {
    color: '#c0392b',
  },
  infoText: {
    color: '#7f8c8d',
  }
});

export default Badge;
