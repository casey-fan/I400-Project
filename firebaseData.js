import firebase from 'firebase/app';
import 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4khG4QMFn8a2Zg6pnigyFkB2sb5kQSCU",
  authDomain: "i400-project.firebaseapp.com",
  projectId: "i400-project",
  storageBucket: "i400-project.appspot.com",
  messagingSenderId: "17582011186",
  appId: "1:17582011186:web:9253a8f1a49fafb7ae5d2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
