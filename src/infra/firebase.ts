// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_dF6Ta_rGPWEd7X-dnmGFpAiCXLtpKic",
  authDomain: "rennie-blind.firebaseapp.com",
  projectId: "rennie-blind",
  storageBucket: "rennie-blind.appspot.com",
  messagingSenderId: "22164914270",
  appId: "1:22164914270:web:2057741069ea2ebc77f4cf",
  measurementId: "G-P3BPM41L8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;

export const firestore = app.firestore()