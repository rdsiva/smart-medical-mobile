import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

/**
 * ListItem component for displaying items in a list
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Primary text
 * @param {string} props.subtitle - Secondary text
 * @param {string} props.imageUrl - URL for the avatar/image
 * @param {function} props.onPress - Function to call when item is pressed
 * @param {React.ReactNode} props.rightComponent - Optional component to display on the right side
 * @param {boolean} props.chevron - Whether to show a chevron on the right
 * @param {Object} props.style - Additional style for the container
 */
const ListItem = ({ 
  title,
  subtitle,
  imageUrl,
  onPress,
  rightComponent,
  chevron = false,
  style = {}
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={onPress}
      disabled={!onPress}
    >
      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}
      
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>
        )}
      </View>
      
      <View style={styles.rightContainer}>
        {rightComponent}
        {chevron && (
          <Text style={styles.chevron}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  imageContainer: {
    marginRight: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    fontSize: 20,
    color: '#bdc3c7',
    marginLeft: 5,
  }
});

export default ListItem;
