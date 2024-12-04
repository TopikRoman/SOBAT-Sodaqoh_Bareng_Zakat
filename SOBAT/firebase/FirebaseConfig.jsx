import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAwwNWDc3vhMLTOoG37VUTnYtIL8t6lfw0",
  authDomain: "sobat-9d3a3.firebaseapp.com",
  projectId: "sobat-9d3a3",
  storageBucket: "sobat-9d3a3.firebasestorage.app",
  messagingSenderId: "552657689340",
  appId: "1:552657689340:web:2603d40c481cdec45d9579",
  measurementId: "G-KFL4V28J3H",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, app };
