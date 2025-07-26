
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiuXTX5T8Hu42agyI090rp0JcQ6JlegHY",
  authDomain: "all-in-one-personal-hub.firebaseapp.com",
  projectId: "all-in-one-personal-hub",
  storageBucket: "all-in-one-personal-hub.firebasestorage.app",
  messagingSenderId: "486782109383",
  appId: "1:486782109383:web:751f64c35e78a29ce460e2",
  measurementId: "",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
