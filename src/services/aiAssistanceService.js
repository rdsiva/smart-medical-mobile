import axios from 'axios';
import API_CONFIG from '../config/api.config';

const BASE_URL = `${API_CONFIG.BASE_URL}/api/ai-assistance`;

export const aiAssistanceService = {
  getConversationHistory: async () => {
    const response = await axios.get(`${BASE_URL}/conversations`);
    return response.data;
  },

  getConversation: async (id) => {
    const response = await axios.get(`${BASE_URL}/conversations/${id}`);
    return response.data;
  },

  sendMessage: async (message) => {
    const response = await axios.post(`${BASE_URL}/message`, message);
    return response.data;
  },

  getHealthInsights: async () => {
    const response = await axios.get(`${BASE_URL}/health-insights`);
    return response.data;
  },

  getMedicalAdvice: async (query) => {
    const response = await axios.post(`${BASE_URL}/medical-advice`, { query });
    return response.data;
  }
};