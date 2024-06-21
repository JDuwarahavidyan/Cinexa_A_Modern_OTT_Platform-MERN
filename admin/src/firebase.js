import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDB17sQAAJlAiQ7dpfMmIGYu5_xCLYl5aA",
  authDomain: "cinexa-d85e0.firebaseapp.com",
  projectId: "cinexa-d85e0",
  storageBucket: "cinexa-d85e0.appspot.com",
  messagingSenderId: "656305385686",
  appId: "1:656305385686:web:699ef3121052b32695d977",
  measurementId: "G-HCJVKG4DNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;