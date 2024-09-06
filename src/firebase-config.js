// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3KbUoC2Jwmq2Xz0aIPAT744EEHUmdUwc",
  authDomain: "dailygrat-b71e8.firebaseapp.com",
  projectId: "dailygrat-b71e8",
  storageBucket: "dailygrat-b71e8.appspot.com",
  messagingSenderId: "97456180212",
  appId: "1:97456180212:web:0575069b5b5e94cd1487a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();