import axios from 'axios';
import API_CONFIG from '../config/api.config';

const BASE_URL = `${API_CONFIG.BASE_URL}/api/medications`;

export const medicationService = {
  getMedications: async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  getMedication: async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  addMedication: async (medicationData) => {
    const response = await axios.post(BASE_URL, medicationData);
    return response.data;
  },

  updateMedication: async (id, medicationData) => {
    const response = await axios.put(`${BASE_URL}/${id}`, medicationData);
    return response.data;
  },

  deleteMedication: async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  }
};