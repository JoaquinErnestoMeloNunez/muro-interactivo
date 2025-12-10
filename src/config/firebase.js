import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNc_asNN4M59olE13ayky7M8QMtMNha4U",
  authDomain: "murointeractivo-dd73c.firebaseapp.com",
  projectId: "murointeractivo-dd73c",
  storageBucket: "murointeractivo-dd73c.firebasestorage.app",
  messagingSenderId: "990886887278",
  appId: "1:990886887278:web:c63ab58eb5ab087d3e0b7f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);