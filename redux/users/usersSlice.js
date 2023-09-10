// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { GetAllUsers, RegisterUser, UserLogin, Logout } from './usersActions';

const initialState = {
  allUsers:[],
  user:[],
  currentUser: null,
  error: null,
  loading: false,
  loggedIn:false
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Update the state correctly here
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading=true;
        state.error = null 
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading=false;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(UserLogin.pending, (state) => {
        state.loading=true;
        state.error=null
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedIn=true;
        state.loading=false;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading=false;
      })
      .addCase(GetAllUsers.pending, (state) => {
        state.loading=true;
        state.error = null;
      })
      .addCase(GetAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(GetAllUsers.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(Logout.pending, (state) => {
        state.loading=true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.user = [];
        state.loggedIn=false;
        state.loading=false;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading=false;
      });
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
