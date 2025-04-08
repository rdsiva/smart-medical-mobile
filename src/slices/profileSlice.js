import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profileService } from '../services/services';

// Async thunks
export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileService.getProfile();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch profile' });
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await profileService.updateProfile(profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update profile' });
    }
  }
);

export const getAddresses = createAsyncThunk(
  'profile/getAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileService.getAddresses();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch addresses' });
    }
  }
);

export const getEmergencyContacts = createAsyncThunk(
  'profile/getEmergencyContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileService.getEmergencyContacts();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch emergency contacts' });
    }
  }
);

const initialState = {
  profile: null,
  addresses: [],
  emergencyContacts: [],
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch profile';
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update profile';
      })
      // Get Addresses
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch addresses';
      })
      // Get Emergency Contacts
      .addCase(getEmergencyContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmergencyContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.emergencyContacts = action.payload;
      })
      .addCase(getEmergencyContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch emergency contacts';
      });
  },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;
