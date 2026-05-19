import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBF7hTspQLnIkR8g3jsTaS2XUikNpt4jp0',
  authDomain: 'sppu-notes-84332.firebaseapp.com',
  projectId: 'sppu-notes-84332',
  storageBucket: 'sppu-notes-84332.firebasestorage.app',
  messagingSenderId: '750922265572',
  appId: '1:750922265572:web:1903586ef1d68b35754df1',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firebaseReady = Promise.resolve({ app, auth, db, storage });
export default app;
