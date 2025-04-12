import axios from 'axios';
import API_CONFIG from '../config/api.config';

// Update the BASE_URL to use the real API endpoint
const BASE_URL = 'https://localhost:7130/api/Appointments';

export const appointmentService = {
  getAppointments: async (fromDate, toDate) => {
    try {
      let url = BASE_URL;
      if (fromDate && toDate) {
        url += `?fromDate=${fromDate}&toDate=${toDate}`;
      }
      const response = await axios.get(url, {
        headers: {
          'accept': '*/*'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  getAppointment: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          'accept': '*/*'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointment ${id}:`, error);
      throw error;
    }
  },

  scheduleAppointment: async (appointmentData) => {
    try {
      const response = await axios.post(BASE_URL, appointmentData, {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      throw error;
    }
  },

  updateAppointment: async (id, appointmentData) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, appointmentData, {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating appointment ${id}:`, error);
      throw error;
    }
  },

  cancelAppointment: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          'accept': '*/*'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error cancelling appointment ${id}:`, error);
      throw error;
    }
  },

  getAppointmentReminders: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}/reminders`, {
        headers: {
          'accept': '*/*'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching reminders for appointment ${id}:`, error);
      throw error;
    }
  }
};