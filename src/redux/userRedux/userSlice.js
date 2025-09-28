// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/client'
// 🔹 Async thunk for login
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post('/Account/login', { email, password });
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);
const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// 🔹 Async thunk for register
export const registerUser = createAsyncThunk(
  'user/register',
  async ({firstName,lastName,phoneNumber, email, password, dayOfBirth,
  monthOfBirth,
  postalCode}, { rejectWithValue }) => {
    try {
      const res = await api.post('/Account/register', { firstName,lastName,phoneNumber, email, password, dayOfBirth,
  monthOfBirth,
  postalCode });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: storedUser?.id||null,
    name:storedUser?.userName,
    token: localStorage.getItem('authToken')||null,
    isAuthenticated: !!storedUser,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.id = null;
      state.name = '';
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
        localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    // ✅ Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.name = action.payload.userName;
        state.token = action.payload.token;
        state.isAuthenticated = true;
         localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.name = action.payload.userName;
        state.token = action.payload.token;
        state.isAuthenticated = true;
         localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
