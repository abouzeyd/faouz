/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authentication: {
    username: '',
    password: '',
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsernameValue(state, action) {
      state.authentication.username = action.payload.username;
    },
    setPasswordValue(state, action) {
      state.authentication.password = action.payload.password;
    },
    loginStart(state) {
      state.authentication.loading = true;
      state.authentication.error = null;
    },
    loginSuccess(state, action) {
      state.authentication.loading = false;
      state.authentication.isAuthenticated = true;
      state.authentication.user = action.payload.user;
      state.authentication.accessToken = action.payload.accessToken;
      state.authentication.refreshToken = action.payload.refreshToken;
      state.authentication.error = null;
    },
    loginFailure(state, action) {
      state.authentication.loading = false;
      state.authentication.isAuthenticated = false;
      state.authentication.user = null;
      state.authentication.accessToken = null;
      state.authentication.refreshToken = null;
      state.authentication.error = action.payload;
    },
    logout(state) {
      state.authentication.isAuthenticated = false;
      state.authentication.user = null;
      state.authentication.accessToken = null;
      state.authentication.refreshToken = null;
      state.authentication.loading = false;
      state.authentication.error = null;
    },
    updateTokens(state, action) {
      state.authentication.accessToken = action.payload.accessToken;
      state.authentication.refreshToken = action.payload.refreshToken;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUsernameValue, setPasswordValue, loginStart, loginSuccess, loginFailure, logout, updateTokens } = authSlice.actions;

export default authSlice.reducer;
