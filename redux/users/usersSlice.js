// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { GetAllUsers, RegisterUser, UserLogin } from './usersActions';

const initialState = {
  allUsers:[],
  user:null,
  currentUser: null,
  error: null,
  loading: false
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
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.error = action.payload;
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
      });
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
