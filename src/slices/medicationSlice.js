import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { medicationService } from '../services/services';

// Async thunks
export const getMedications = createAsyncThunk(
  'medication/getMedications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await medicationService.getMedications();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch medications' });
    }
  }
);

export const getMedication = createAsyncThunk(
  'medication/getMedication',
  async (id, { rejectWithValue }) => {
    try {
      const response = await medicationService.getMedication(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch medication' });
    }
  }
);

export const addMedication = createAsyncThunk(
  'medication/addMedication',
  async (medicationData, { rejectWithValue }) => {
    try {
      const response = await medicationService.addMedication(medicationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to add medication' });
    }
  }
);

export const updateMedication = createAsyncThunk(
  'medication/updateMedication',
  async ({ id, medicationData }, { rejectWithValue }) => {
    try {
      const response = await medicationService.updateMedication(id, medicationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update medication' });
    }
  }
);

export const deleteMedication = createAsyncThunk(
  'medication/deleteMedication',
  async (id, { rejectWithValue }) => {
    try {
      const response = await medicationService.deleteMedication(id);
      return { id, ...response };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete medication' });
    }
  }
);

export const getMedicationSchedules = createAsyncThunk(
  'medication/getMedicationSchedules',
  async (id, { rejectWithValue }) => {
    try {
      const response = await medicationService.getMedicationSchedules(id);
      return { id, schedules: response };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch medication schedules' });
    }
  }
);

export const getMedicationDoses = createAsyncThunk(
  'medication/getMedicationDoses',
  async ({ id, fromDate, toDate }, { rejectWithValue }) => {
    try {
      const response = await medicationService.getMedicationDoses(id, fromDate, toDate);
      return { id, doses: response };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch medication doses' });
    }
  }
);

const initialState = {
  medications: [],
  currentMedication: null,
  schedules: {},
  doses: {},
  loading: false,
  error: null,
};

const medicationSlice = createSlice({
  name: 'medication',
  initialState,
  reducers: {
    clearMedicationError: (state) => {
      state.error = null;
    },
    clearCurrentMedication: (state) => {
      state.currentMedication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Medications
      .addCase(getMedications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMedications.fulfilled, (state, action) => {
        state.loading = false;
        state.medications = action.payload;
      })
      .addCase(getMedications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch medications';
      })
      // Get Medication
      .addCase(getMedication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMedication.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMedication = action.payload;
      })
      .addCase(getMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch medication';
      })
      // Add Medication
      .addCase(addMedication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMedication.fulfilled, (state) => {
        state.loading = false;
        // We would typically add the new medication to the state here,
        // but since our mock API doesn't return the full object, we'll
        // just leave it for a refetch
      })
      .addCase(addMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add medication';
      })
      // Update Medication
      .addCase(updateMedication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMedication.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update medication';
      })
      // Delete Medication
      .addCase(deleteMedication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedication.fulfilled, (state, action) => {
        state.loading = false;
        state.medications = state.medications.filter(med => med.id !== action.payload.id);
        if (state.currentMedication && state.currentMedication.id === action.payload.id) {
          state.currentMedication = null;
        }
      })
      .addCase(deleteMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete medication';
      })
      // Get Medication Schedules
      .addCase(getMedicationSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMedicationSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules[action.payload.id] = action.payload.schedules;
      })
      .addCase(getMedicationSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch medication schedules';
      })
      // Get Medication Doses
      .addCase(getMedicationDoses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMedicationDoses.fulfilled, (state, action) => {
        state.loading = false;
        state.doses[action.payload.id] = action.payload.doses;
      })
      .addCase(getMedicationDoses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch medication doses';
      });
  },
});

export const { clearMedicationError, clearCurrentMedication } = medicationSlice.actions;
export default medicationSlice.reducer;
