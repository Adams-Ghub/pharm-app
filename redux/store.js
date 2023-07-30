import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice';
import prescriptionReducer from './prescriptions/prescriptionSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    prescription: prescriptionReducer,
  },
});

export default store;