import { createSlice } from '@reduxjs/toolkit';
import { AddPrescription, GetAllPrescription } from './prescriptionActions';
import { Alert } from 'react-native';

const initialState = {
  prescriptions: [],
  loading: false,
  message: null,
  error: null,
  prescriptionMsg: '',
};

const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  reducers: {
    getMyPrescriptions: (state, action) => {
      const filtered = state.prescriptions.filter(
        (prescription) => prescription.customerId === action.payload
      );
      return filtered;
    },
    updatePrescriptions: (state, action) => {
      state.prescriptions = action.payload; // Update the state correctly here
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddPrescription.pending, (state, action) => {
        state.currentUser = action.payload;
        state.prescriptionMsg = 'prescribing...';
      })
      .addCase(AddPrescription.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.prescriptionMsg = 'prescription successfully added';
        Alert.alert('Message', 'prescription successfully made');
      })
      .addCase(AddPrescription.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(GetAllPrescription.pending, (state, action) => {
        state.prescriptionMsg = 'retrieving data...';
      })
      .addCase(GetAllPrescription.fulfilled, (state, action) => {
        state.prescriptions = action.payload;
        state.prescriptionMsg = 'retrieved successfully';
      })
      .addCase(GetAllPrescription.rejected, (state, action) => {
        state.prescriptionMsg = '';
      });
  },
});

export const { checkStatus, getMyPrescriptions, updatePrescriptions } =
  prescriptionSlice.actions;
export default prescriptionSlice.reducer;
