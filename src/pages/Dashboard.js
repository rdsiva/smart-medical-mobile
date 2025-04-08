import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../slices/profileSlice';
import { getMedications } from '../slices/medicationSlice';
import { getAppointments } from '../slices/appointmentSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);
  const { medications } = useSelector(state => state.medication);
  const { appointments } = useSelector(state => state.appointment);
  
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getMedications());
    dispatch(getAppointments());
  }, [dispatch]);

  // Filter upcoming appointments (next 7 days)
  const upcomingAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.startTime);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return appointmentDate >= today && appointmentDate <= nextWeek;
  }).slice(0, 3); // Show only 3 upcoming appointments

  // Filter medications that need to be taken today
  const todaysMedications = medications.filter(medication => 
    medication.isActive
  ).slice(0, 3); // Show only 3 medications

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {profile?.firstName || 'User'}</Text>
          <Text style={styles.subtitle}>Here's your health summary</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Medications</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {todaysMedications.length > 0 ? (
            todaysMedications.map(medication => (
              <View key={medication.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{medication.name}</Text>
                  <Text style={styles.cardSubtitle}>{medication.dosage} - {medication.frequency}</Text>
                  <Text style={styles.cardDescription}>{medication.instructions}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No medications scheduled</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(appointment => (
              <View key={appointment.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{appointment.purpose}</Text>
                  <Text style={styles.cardSubtitle}>
                    {new Date(appointment.startTime).toLocaleDateString()} at {new Date(appointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  <Text style={styles.cardDescription}>{appointment.location}</Text>
                  <Text style={styles.cardDescription}>With: {appointment.providerName}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No upcoming appointments</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Add Medication</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Schedule Appointment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Talk to AI Assistant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  section: {
    marginTop: 20,
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  seeAll: {
    color: '#3498db',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#7f8c8d',
    padding: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Dashboard;
