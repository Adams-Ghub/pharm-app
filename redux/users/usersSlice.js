// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { RegisterUser, UserLogin } from './usersActions';

const initialState = {
  user:null,
  currentUser: null,
  error: null,
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
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
