import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const prescriptionSlice = createSlice(
  {
    name: 'prescription',
    initialState,
    reducers: {
      checkStatus: (state, action) => { state.categoryList = action.payload === 'Under construction' ? 'Under construction' : state.categoryList; },

    },
  },
);

export const { checkStatus } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;