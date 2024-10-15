// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCG4e-Af5Ak_GjuXJl0nOnLo30tTgc9020",
  authDomain: "yogacourse-12d72.firebaseapp.com",
  databaseURL: "https://yogacourse-12d72-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yogacourse-12d72",
  storageBucket: "yogacourse-12d72.appspot.com",
  messagingSenderId: "185501124967",
  appId: "1:185501124967:web:e20b885b9dc770ef7607c2",
  measurementId: "G-C4DD004BL3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };