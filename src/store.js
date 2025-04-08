import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import medicationReducer from './slices/medicationSlice';
import appointmentReducer from './slices/appointmentSlice';
import aiAssistantReducer from './slices/aiAssistantSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    medication: medicationReducer,
    appointment: appointmentReducer,
    aiAssistant: aiAssistantReducer,
  },
});
