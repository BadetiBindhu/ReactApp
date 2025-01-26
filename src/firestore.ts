// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbyVK7nn0Boj3j9spdw53oM89G_WJvy9E",
  authDomain: "studentdb-4eeab.firebaseapp.com",
  databaseURL: "https://studentdb-4eeab-default-rtdb.firebaseio.com",
  projectId: "studentdb-4eeab",
  storageBucket: "studentdb-4eeab.firebasestorage.app",
  messagingSenderId: "200557626516",
  appId: "1:200557626516:web:b05272e78aa2c09ccbe081",
  measurementId: "G-BDBCL018KM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
export {db};
