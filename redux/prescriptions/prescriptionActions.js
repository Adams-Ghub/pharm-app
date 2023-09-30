import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection, getDocs,onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';
import {updatePrescriptions} from './prescriptionSlice'

const AddPrescription = createAsyncThunk(
  'addPrescription',
  async (
    { id, customerId, pharmacistId, pharmacy,prescription, date, patientInfo, customer },
    { rejectWithValue }
  ) => {
    try {
      await setDoc(doc(db, 'prescriptions', id), {
        id,
        customerId,
        customer,
        pharmacistId,
        pharmacy,
        patientInfo,
        prescription,
        date,
      });
    } catch (error) {
      rejectWithValue(error);
      throw error
    }
  }
);

const GetAllPrescription = createAsyncThunk(
  'getPrescription',
  async (_, thunkAPI) => {
    try {
      const prescriptions = [];
      const querySnapshot = await getDocs(collection(db, "prescriptions"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        prescriptions.push(doc.data());
      });
      return prescriptions;
    } catch (error) {
      throw error;
    }
  }
);

/*
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
  });

*/

//Listener Actions

export const listenToPrescriptionsUpdate = () => (dispatch) => {
  const firestoreCollection = collection(db, 'prescriptions');

  const unsubscribe = onSnapshot(firestoreCollection, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    dispatch(updatePrescriptions(data));
  });

  // Clean up the listener when needed
  return () => unsubscribe();
};

export { AddPrescription, GetAllPrescription };
