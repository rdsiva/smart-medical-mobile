import api from './api';

// Auth Service
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  refreshToken: async (refreshToken) => {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data;
  }
};

// Profile Service
export const profileService = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  
  updateProfile: async (profileData) => {
    const response = await api.put('/profile', profileData);
    return response.data;
  },
  
  getAddresses: async () => {
    const response = await api.get('/profile/addresses');
    return response.data;
  },
  
  getEmergencyContacts: async () => {
    const response = await api.get('/profile/emergency-contacts');
    return response.data;
  }
};

// Medication Service
export const medicationService = {
  getMedications: async () => {
    const response = await api.get('/medications');
    return response.data;
  },
  
  getMedication: async (id) => {
    const response = await api.get(`/medications/${id}`);
    return response.data;
  },
  
  addMedication: async (medicationData) => {
    const response = await api.post('/medications', medicationData);
    return response.data;
  },
  
  updateMedication: async (id, medicationData) => {
    const response = await api.put(`/medications/${id}`, medicationData);
    return response.data;
  },
  
  deleteMedication: async (id) => {
    const response = await api.delete(`/medications/${id}`);
    return response.data;
  },
  
  getMedicationSchedules: async (id) => {
    const response = await api.get(`/medications/${id}/schedules`);
    return response.data;
  },
  
  getMedicationDoses: async (id, fromDate, toDate) => {
    const response = await api.get(`/medications/${id}/doses`, {
      params: { fromDate, toDate }
    });
    return response.data;
  }
};

// Appointment Service
export const appointmentService = {
  getAppointments: async (fromDate, toDate) => {
    const response = await api.get('/appointments', {
      params: { fromDate, toDate }
    });
    return response.data;
  },
  
  getAppointment: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },
  
  scheduleAppointment: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },
  
  updateAppointment: async (id, appointmentData) => {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },
  
  cancelAppointment: async (id) => {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  },
  
  getAppointmentReminders: async (id) => {
    const response = await api.get(`/appointments/${id}/reminders`);
    return response.data;
  }
};

// AI Assistant Service
export const aiAssistantService = {
  getConversations: async () => {
    const response = await api.get('/aiassistant/conversations');
    return response.data;
  },
  
  getConversation: async (id) => {
    const response = await api.get(`/aiassistant/conversations/${id}`);
    return response.data;
  },
  
  startConversation: async (conversationData) => {
    const response = await api.post('/aiassistant/conversations', conversationData);
    return response.data;
  },
  
  updateConversation: async (id, conversationData) => {
    const response = await api.put(`/aiassistant/conversations/${id}`, conversationData);
    return response.data;
  },
  
  getMessages: async (id) => {
    const response = await api.get(`/aiassistant/conversations/${id}/messages`);
    return response.data;
  },
  
  sendMessage: async (id, messageData) => {
    const response = await api.post(`/aiassistant/conversations/${id}/messages`, messageData);
    return response.data;
  }
};
