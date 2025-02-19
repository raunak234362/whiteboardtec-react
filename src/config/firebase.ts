// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwLCu5ANZiUHFkjqef1dk2S2y5bX5rrwQ",
  authDomain: "whiteboard-website.firebaseapp.com",
  projectId: "whiteboard-website",
  storageBucket: "whiteboard-website.appspot.com",
  messagingSenderId: "992114022169",
  appId: "1:992114022169:web:c160410928eee5bbfe9788",
  measurementId: "G-630VYJ5PHC",
  databaseURL: "https://whiteboard-website-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
