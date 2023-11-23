// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  GetAllUsers,
  RegisterUser,
  UserLogin,
  Logout,
  UpdateProfile,
} from './usersActions';

const initialState = {
  allUsers: [],
  user: [],
  error: null,
  loading: false,
  loggedIn: false,
  profileMsg: '',
  signupMsg: '',
  loginMsg: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Update the state correctly here
    },
    updateUser: (state, action) => {
      state.user = action.payload; // Update the state correctly here
    },
    resetProfileMsg: (state, action) => {
      state.profileMsg = ''; // Update the state correctly here
    },
    clearSignUpMsg:(state)=>{
      state.signupMsg = ''; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.signupMsg = 'signing up...';
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.signupMsg = 'successful';
        state.loading = false;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.error = action.payload;
        state.signupMsg = '';
      })
      .addCase(UserLogin.pending, (state) => {
        state.loginMsg = 'signing in...';
        state.error = null;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
        state.loginMsg = 'Successfully logged in';
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.loginMsg = '';
      })
      .addCase(GetAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(GetAllUsers.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(UpdateProfile.pending, (state) => {
        state.profileMsg = 'updating...';
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.profileMsg = 'updated successfully';
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        state.profileMsg = '';
      })
      .addCase(Logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.user = [];
        state.loggedIn = false;
        state.loading = false;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setUser, updateUser, resetProfileMsg,clearSignUpMsg } = usersSlice.actions;
export default usersSlice.reducer;
