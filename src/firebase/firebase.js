// src/firebase/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCtGp90-Hwg5zLqjxGguWDS_WPWwZ8YJlA",
  authDomain: "mobile-auth-a32dd.firebaseapp.com",
  projectId: "mobile-auth-a32dd",
  storageBucket: "mobile-auth-a32dd.firebasestorage.app",
  messagingSenderId: "178997466793",
  appId: "1:178997466793:web:32307824a386230dd37bb8"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
export const auth = getAuth(app);


