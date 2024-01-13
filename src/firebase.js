import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAJeWJT4cTWadMIwkRo1I0M2qKGa9k9-J4",
  authDomain: "tic-tac-toe-3aee6.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-3aee6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tic-tac-toe-3aee6",
  storageBucket: "tic-tac-toe-3aee6.appspot.com",
  messagingSenderId: "227016864071",
  appId: "1:227016864071:web:74bda05f0bffc4d00e9c62",
  measurementId: "G-YNE5YEB75Q"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };
