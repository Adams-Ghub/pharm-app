import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,getAuth, signOut
} from 'firebase/auth';
import { setDoc, getDoc, doc, getDocs,collection  } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase.js';


export const RegisterUser = createAsyncThunk(
  'user/register',
  async (
    { email, password, role, name, registration },thunkAPI
  ) => {
    try {
      let user = {};
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          user = userCredential.user;

          setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            role,
            registration: role == 'customer' ? 'none' : registration,
            name,
            photo: 'unknown',
            phone:'',
            pharmacy: role == 'customer' ? 'none' : 'unknown',
          });
        }
      );
      return user;
    } catch (error) {
     thunkAPI.rejectWithValue(error);
    }
  }
);

export const UserLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      let loggedUser = {};
      await signInWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          // Signed in
          const user = userCredential.user;

          loggedUser =  {email:user.auth.email,id:user.uid};
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          console.log('data:', docSnap.data());
          const data = docSnap.data();
          if (data) {
            loggedUser = { ...loggedUser, details: data };
          } else {
            loggedUser = { ...loggedUser, details: [] };
          }
        }
      );
      return loggedUser;
    } catch (error) {
      const errorMessage = error.message;
      alert(error.message)
      return rejectWithValue(errorMessage);
    }
  }
);

export const Logout = createAsyncThunk(
  'user/Logout',
  async (_, thunkAPI) => {
    try {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
      })
    } catch (error) {
      throw error;
    }
  }
);

export const GetAllUsers = createAsyncThunk(
  'user/getUsers',
  async (_, thunkAPI) => {
    try {
      const userData = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        userData.push(doc.data());
      });
      return userData;
    } catch (error) {
      throw error;
    }
  }
);
