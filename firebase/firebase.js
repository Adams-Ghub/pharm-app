import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

// import 'firebase/compat/firestore';
// import "firebase/firestore";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCFtyosemsERYjQBaTfGsCdaSFXhlSP8W0',
  authDomain: 'pharma-7f81d.firebaseapp.com',
  projectId: 'pharma-7f81d',
  storageBucket: 'pharma-7f81d.appspot.com',
  messagingSenderId: '665192632882',
  appId: '1:665192632882:web:7db8557cde81a67261e22b',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,db};
