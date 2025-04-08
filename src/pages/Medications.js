import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMedications, getMedication, addMedication, updateMedication, deleteMedication } from '../slices/medicationSlice';

const Medications = () => {
  const dispatch = useDispatch();
  const { medications, loading, error } = useSelector(state => state.medication);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    dispatch(getMedications());
  }, [dispatch]);

  const filteredMedications = medications.filter(medication => 
    medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medication.dosage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medication.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMedication = () => {
    // Navigate to add medication form
  };

  const handleMedicationPress = (id) => {
    // Navigate to medication detail
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Medications</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search medications..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : (
        <ScrollView style={styles.medicationList}>
          {filteredMedications.length > 0 ? (
            filteredMedications.map(medication => (
              <TouchableOpacity 
                key={medication.id} 
                style={styles.medicationCard}
                onPress={() => handleMedicationPress(medication.id)}
              >
                <View style={styles.medicationHeader}>
                  <Text style={styles.medicationName}>{medication.name}</Text>
                  <View style={[
                    styles.statusBadge, 
                    medication.isActive ? styles.activeBadge : styles.inactiveBadge
                  ]}>
                    <Text style={styles.statusText}>
                      {medication.isActive ? 'Active' : 'Inactive'}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.medicationDetail}>
                  <Text style={styles.detailLabel}>Dosage: </Text>
                  {medication.dosage}
                </Text>
                
                <Text style={styles.medicationDetail}>
                  <Text style={styles.detailLabel}>Frequency: </Text>
                  {medication.frequency}
                </Text>
                
                <Text style={styles.medicationDetail}>
                  <Text style={styles.detailLabel}>Prescribed by: </Text>
                  {medication.prescribedBy}
                </Text>
                
                <Text style={styles.medicationDetail}>
                  <Text style={styles.detailLabel}>Start date: </Text>
                  {new Date(medication.startDate).toLocaleDateString()}
                </Text>
                
                {medication.endDate && (
                  <Text style={styles.medicationDetail}>
                    <Text style={styles.detailLabel}>End date: </Text>
                    {new Date(medication.endDate).toLocaleDateString()}
                  </Text>
                )}
                
                <Text style={styles.medicationInstructions}>
                  {medication.instructions}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>
              {searchQuery ? 'No medications match your search' : 'No medications added yet'}
            </Text>
          )}
        </ScrollView>
      )}

      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddMedication}
      >
        <Text style={styles.addButtonText}>+ Add Medication</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#3498db',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medicationList: {
    padding: 15,
  },
  medicationCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  activeBadge: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
  },
  inactiveBadge: {
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  medicationDetail: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#34495e',
  },
  medicationInstructions: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 10,
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    margin: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#7f8c8d',
    padding: 20,
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    margin: 15,
  },
  loader: {
    marginTop: 50,
  },
});

export default Medications;
