import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { appointmentService } from '../services/services';

// Async thunks
export const getAppointments = createAsyncThunk(
  'appointment/getAppointments',
  async ({ fromDate, toDate } = {}, { rejectWithValue }) => {
    try {
      const response = await appointmentService.getAppointments(fromDate, toDate);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch appointments' });
    }
  }
);

export const getAppointment = createAsyncThunk(
  'appointment/getAppointment',
  async (id, { rejectWithValue }) => {
    try {
      const response = await appointmentService.getAppointment(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch appointment' });
    }
  }
);

export const scheduleAppointment = createAsyncThunk(
  'appointment/scheduleAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await appointmentService.scheduleAppointment(appointmentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to schedule appointment' });
    }
  }
);

export const updateAppointment = createAsyncThunk(
  'appointment/updateAppointment',
  async ({ id, appointmentData }, { rejectWithValue }) => {
    try {
      const response = await appointmentService.updateAppointment(id, appointmentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update appointment' });
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  'appointment/cancelAppointment',
  async (id, { rejectWithValue }) => {
    try {
      const response = await appointmentService.cancelAppointment(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to cancel appointment' });
    }
  }
);

export const getAppointmentReminders = createAsyncThunk(
  'appointment/getAppointmentReminders',
  async (id, { rejectWithValue }) => {
    try {
      const response = await appointmentService.getAppointmentReminders(id);
      return { id, reminders: response };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch appointment reminders' });
    }
  }
);

const initialState = {
  appointments: [],
  currentAppointment: null,
  reminders: {},
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    clearAppointmentError: (state) => {
      state.error = null;
    },
    clearCurrentAppointment: (state) => {
      state.currentAppointment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Appointments
      .addCase(getAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch appointments';
      })
      // Get Appointment
      .addCase(getAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAppointment = action.payload;
      })
      .addCase(getAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch appointment';
      })
      // Schedule Appointment
      .addCase(scheduleAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scheduleAppointment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(scheduleAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to schedule appointment';
      })
      // Update Appointment
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update appointment';
      })
      // Cancel Appointment
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(apt => apt.id !== action.payload.id);
        if (state.currentAppointment && state.currentAppointment.id === action.payload.id) {
          state.currentAppointment = null;
        }
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to cancel appointment';
      })
      // Get Appointment Reminders
      .addCase(getAppointmentReminders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointmentReminders.fulfilled, (state, action) => {
        state.loading = false;
        state.reminders[action.payload.id] = action.payload.reminders;
      })
      .addCase(getAppointmentReminders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch appointment reminders';
      });
  },
});

export const { clearAppointmentError, clearCurrentAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
