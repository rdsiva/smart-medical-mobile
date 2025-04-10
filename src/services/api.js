import axios from 'axios';
import store from '../store';
import { refreshToken, logout } from '../slices/authSlice';

// Create an axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding the auth token
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        await store.dispatch(refreshToken());
        const state = store.getState();
        
        // If we got a new token, retry the original request
        if (state.auth.token) {
          originalRequest.headers.Authorization = `Bearer ${state.auth.token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh failed, logout the user
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
