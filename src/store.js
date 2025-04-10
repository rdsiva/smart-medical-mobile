import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// We'll create these slices later
// import medicalRecordsReducer from './slices/medicalRecordsSlice';
// import appointmentsReducer from './slices/appointmentsSlice';
// import notificationsReducer from './slices/notificationsSlice';
// import medicationsReducer from './slices/medicationsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // medicalRecords: medicalRecordsReducer,
    // appointments: appointmentsReducer,
    // notifications: notificationsReducer,
    // medications: medicationsReducer,
  },
});

export default store;
