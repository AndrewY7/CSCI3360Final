import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAXcR3T3b1n2Si60NpBbgQvvz7QF8HeEbE",
    authDomain: "healthai-780dc.firebaseapp.com",
    projectId: "healthai-780dc",
    storageBucket: "healthai-780dc.firebasestorage.app",
    messagingSenderId: "321626895600",
    appId: "1:321626895600:web:31a3adf86bab853d01be35",
    measurementId: "G-K14FSKC8GR"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;