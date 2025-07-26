
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiuXTX5T8Hu42agyI090rp0JcQ6JlegHY",
  authDomain: "all-in-one-personal-hub.firebaseapp.com",
  projectId: "all-in-one-personal-hub",
  storageBucket: "all-in-one-personal-hub.firebasestorage.app",
  messagingSenderId: "486782109383",
  appId: "1:486782109383:web:751f64c35e78a29ce460e2",
  measurementId: "",
};

// A more robust way to initialize Firebase and export services
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage };
