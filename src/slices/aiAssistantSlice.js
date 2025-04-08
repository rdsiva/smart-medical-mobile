import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { aiAssistantService } from '../services/services';

// Async thunks
export const getConversations = createAsyncThunk(
  'aiAssistant/getConversations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await aiAssistantService.getConversations();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch conversations' });
    }
  }
);

export const getConversation = createAsyncThunk(
  'aiAssistant/getConversation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await aiAssistantService.getConversation(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch conversation' });
    }
  }
);

export const startConversation = createAsyncThunk(
  'aiAssistant/startConversation',
  async (conversationData, { rejectWithValue }) => {
    try {
      const response = await aiAssistantService.startConversation(conversationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to start conversation' });
    }
  }
);

export const updateConversation = createAsyncThunk(
  'aiAssistant/updateConversation',
  async ({ id, conversationData }, { rejectWithValue }) => {
    try {
      const response = await aiAssistantService.updateConversation(id, conversationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update conversation' });
    }
  }
);

export const getMessages = createAsyncThunk(
  'aiAssistant/getMessages',
  async (id, { rejectWithValue }) => {
    try {
      const response = await aiAssistantService.getMessages(id);
      return { id, messages: response };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch messages' });
    }
  }
);

export const sendMessage = createAsyncThunk(
  'aiAssistant/sendMessage',
  async ({ id, messageData }, { rejectWithValue }) => {
    try {
      const response = await aiAssistantService.sendMessage(id, messageData);
      return { id, message: response };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to send message' });
    }
  }
);

const initialState = {
  conversations: [],
  currentConversation: null,
  messages: {},
  loading: false,
  error: null,
};

const aiAssistantSlice = createSlice({
  name: 'aiAssistant',
  initialState,
  reducers: {
    clearAIAssistantError: (state) => {
      state.error = null;
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Conversations
      .addCase(getConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch conversations';
      })
      // Get Conversation
      .addCase(getConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConversation = action.payload;
      })
      .addCase(getConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch conversation';
      })
      // Start Conversation
      .addCase(startConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startConversation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(startConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to start conversation';
      })
      // Update Conversation
      .addCase(updateConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConversation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update conversation';
      })
      // Get Messages
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages[action.payload.id] = action.payload.messages;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch messages';
      })
      // Send Message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.messages[action.payload.id]) {
          state.messages[action.payload.id].push(action.payload.message);
        } else {
          state.messages[action.payload.id] = [action.payload.message];
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to send message';
      });
  },
});

export const { clearAIAssistantError, clearCurrentConversation } = aiAssistantSlice.actions;
export default aiAssistantSlice.reducer;
