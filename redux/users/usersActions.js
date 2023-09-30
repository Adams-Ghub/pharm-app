import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from 'firebase/auth';
import {
  setDoc,
  getDoc,
  doc,
  getDocs,
  collection,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase.js';
import { updateUser } from './usersSlice.js';
import { useDispatch } from 'react-redux';

export const RegisterUser = createAsyncThunk(
  'user/register',
  async ({ email, password, role, name, registration }, thunkAPI) => {
    try {
      let user = {};
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          user = userCredential.user;

          setDoc(
            doc(db, 'users', user.uid),
            role === 'pharmacist'
              ? {
                  id: user.uid,
                  role,
                  registration,
                  name,
                  photo: '',
                  phone: '',
                  email,
                  pharmacy: '',
                }
              : {
                  id: user.uid,
                  role,
                  name,
                  photo: '',
                  phone: '',
                  email,
                }
          );
        }
      );
      user = { ...user, name, role };
      return user;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const UpdateProfile = createAsyncThunk(
  'profile-update',
  async (data, thunkAPI) => {
    try {
      const profile = doc(db, 'users', data.id);

      await updateDoc(
        profile,
        data.role === 'customer'
          ? {
              id: data.id,
              name: data.name,
              photo: '',
              phone: data.phone,
              email: data.email,
            }
          : {
              id: data.id,
              registration: data.registration,
              name: data.name,
              photo: '',
              phone: data.phone,
              email: data.email,
              pharmacy: data.pharmacy,
            }
      );
    } catch (error) {
      alert(error.message);
      throw error;
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

          loggedUser = { email: user.email, id: user.uid };
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          const data = docSnap.data();
          if (data) {
            loggedUser = data;
            console.log('insideData:', data);
          }
        }
      );
      console.log('user', loggedUser);
      return loggedUser;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message); // Provide a more detailed error message
    }
  }
);

export const Logout = createAsyncThunk('user/Logout', async (_, thunkAPI) => {
  try {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    });
  } catch (error) {
    throw error;
  }
});

export const GetAllUsers = createAsyncThunk(
  'user/getUsers',
  async (_, thunkAPI) => {
    try {
      const userData = [];
      const querySnapshot = await getDocs(collection(db, 'users'));
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

///Listerner Actions
export const listenToProfileUpdate = (id) => (dispatch) => {
  // Reference to the user document
  const userDocRef = doc(db, 'users', id);

  // Subscribe to updates on the user document
  const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      // Dispatch the updated user data to Redux
      dispatch(updateUser(docSnapshot.data()));
    }
  });

  // Clean up the listener when needed
  return () => unsubscribe();
};
