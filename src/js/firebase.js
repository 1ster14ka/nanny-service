// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzK_o_weL94TpPE9waNwEDk1_4o9gaJuE",
  authDomain: "nanny-services-73a04.firebaseapp.com",
  projectId: "nanny-services-73a04",
  storageBucket: "nanny-services-73a04.firebasestorage.app",
  messagingSenderId: "549777202587",
  appId: "1:549777202587:web:a0bf6de0d554ec7cd3553e",
  measurementId: "G-JWTN8C68MZ",
  databaseURL: "https://nanny-services-73a04-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// const analytics = getAnalytics(app);

export { auth, db };
