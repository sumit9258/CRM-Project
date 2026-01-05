// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcAB3K1C92vn3RFia4AZnepSUV2qvBD_M",
  authDomain: "sales-force-one.firebaseapp.com",
  projectId: "sales-force-one",
  storageBucket: "sales-force-one.firebasestorage.app",
  messagingSenderId: "305305497558",
  appId: "1:305305497558:web:827163a5bd9454e324fe77",
  measurementId: "G-C2LV5KV3CC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app,auth}