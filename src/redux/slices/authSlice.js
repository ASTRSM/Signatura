import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import supabase from '../../helper/supabaseInit';

const initialState = {
  data: 1,
  error: null,
  status: 'idle',
};

export const googleLogin = createAsyncThunk('auth/googleLogin', async () => {
  console.log('supabase');
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  console.log('data', data);
  return {data, error};
});

export const googleLogout = createAsyncThunk('auth/googleLogout', async () => {
  const {error} = await supabase.auth.signOut();
  return error;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginExample: (state, action) => {
      state.data = action.payload;
    },
    logoutExample: state => {
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.status = 'success';
      })
      .addCase(googleLogin.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(googleLogout.fulfilled, (state, action) => {
        state.data = null;
        state.status = 'success';
      })
      .addCase(googleLogout.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(googleLogout.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const selectAuth = state => state.auth;

export const {loginExample, logoutExample} = authSlice.actions;

export default authSlice.reducer;
