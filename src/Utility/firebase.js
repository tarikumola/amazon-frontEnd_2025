// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj6agJU8tx2AjOG9znoV0rxAdm-mhZsyM",
  authDomain: "clone-2025-5e762.firebaseapp.com",
  projectId: "clone-2025-5e762",
  storageBucket: "clone-2025-5e762.firebasestorage.app",
  messagingSenderId: "433568791467",
  appId: "1:433568791467:web:25e52cd94edb839349b0ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)