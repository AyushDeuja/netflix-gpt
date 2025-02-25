// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDcxF_8so5g_VPdtFcdn0PW8wZGTi3HTA",
  authDomain: "netflixgpt-58c20.firebaseapp.com",
  projectId: "netflixgpt-58c20",
  storageBucket: "netflixgpt-58c20.firebasestorage.app",
  messagingSenderId: "210336126307",
  appId: "1:210336126307:web:9c10550ef0841304f0af56",
  measurementId: "G-VMB4EF343B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();