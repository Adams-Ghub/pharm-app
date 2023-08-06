import { createSlice } from '@reduxjs/toolkit';
import{ AddPrescription,GetAllPrescription} from './prescriptionActions'; 

const initialState = {
  prescriptions: [],
  loading:false,
  message:null,
  error:null
};

const prescriptionSlice = createSlice(
  {
    name: 'prescription',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(AddPrescription.fulfilled, (state, action) => {
          state.currentUser = action.payload;
          state.message = 'prescription successfully added'
        })
        .addCase(AddPrescription.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(GetAllPrescription.pending, (state, action) => {
          state.loading=true
        })
        .addCase(GetAllPrescription.fulfilled, (state, action) => {
          state.prescriptions = action.payload;
          state.loading=false
        })
        .addCase(GetAllPrescription.rejected, (state, action) => {
          state.error = action.payload;
        });
    },
  },
);

export const { checkStatus } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;