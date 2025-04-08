import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * TabBar component for navigation between app sections
 * 
 * @param {Object} props - Component props
 * @param {Array} props.tabs - Array of tab objects with label and icon properties
 * @param {number} props.activeTab - Index of the active tab
 * @param {function} props.onTabPress - Function to call when a tab is pressed
 * @param {Object} props.style - Additional style for the container
 */
const TabBar = ({ 
  tabs = [],
  activeTab = 0,
  onTabPress,
  style = {}
}) => {
  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            activeTab === index && styles.activeTab
          ]}
          onPress={() => onTabPress(index)}
        >
          <Text style={[
            styles.tabText,
            activeTab === index && styles.activeTabText
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    height: 60,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#3498db',
  },
  tabText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  activeTabText: {
    color: '#3498db',
    fontWeight: 'bold',
  }
});

export default TabBar;
