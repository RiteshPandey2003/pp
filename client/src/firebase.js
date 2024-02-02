// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyAOdUwIpOeqZwvdufB2uWvgNHlBrbpNSpk",
  authDomain: "mern-auth-d4178.firebaseapp.com",
  projectId: "mern-auth-d4178",
  storageBucket: "mern-auth-d4178.appspot.com",
  messagingSenderId: "238642206799",
  appId: "1:238642206799:web:4cf9355860876b50da723a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);