// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcrCTlcHPMMzKuraEIkZ2pnhWBBM8vQQc",
  authDomain: "typescript-react-login.firebaseapp.com",
  projectId: "typescript-react-login",
  storageBucket: "typescript-react-login.appspot.com",
  messagingSenderId: "1090746077535",
  appId: "1:1090746077535:web:78a65ed14afaa8ccbce6ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);