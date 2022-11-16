import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyClXr1cblXBNqXkUE6GkoeVTlig13rXX-E",
    authDomain: "react-todoapp-45f92.firebaseapp.com",
    projectId: "react-todoapp-45f92",
    storageBucket: "react-todoapp-45f92.appspot.com",
    messagingSenderId: "340970224204",
    appId: "1:340970224204:web:e250a999556d37c68692e9",
    measurementId: "G-QLR213ZNJG",
  };

  const firebaseApp = initializeApp(firebaseConfig);
  export const auth = getAuth(firebaseApp);
 
  

  