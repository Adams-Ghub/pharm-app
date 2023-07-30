
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase.js';

export const RegisterUser = createAsyncThunk(
  'user/register',
  async (
    { email, password, role, phone, registration },
    { rejectWithValue },
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
            name: 'unknown',
            photo: 'unknown',
            phone,
            pharmacy: role == 'customer' ? 'none' : 'unknown',
          });
        },
      );
      return user;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const UserLogin = createAsyncThunk(
  'user/login',
  async  (
    { email, password},
    { rejectWithValue },
  ) => {
   try{ let loggedUser = {};
    await signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed in
        const user = userCredential.user;
     
        loggedUser={user:user};
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        console.log('data:',docSnap.data())
        const data=docSnap.data();
        if (data) {
          loggedUser={...loggedUser,details:data};
        } else {
          loggedUser={...loggedUser,details:[]};
        }
       
      })
      return loggedUser
     } catch(error) {
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      }
  },
);


