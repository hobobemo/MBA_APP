import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDz5QS7EJ8lsazBZNyfRRwn9aU2S5lM6pM",
  authDomain: "band-aid-575fe.firebaseapp.com",
  databaseURL: "https://band-aid-575fe-default-rtdb.firebaseio.com",
  projectId: "band-aid-575fe",
  storageBucket: "band-aid-575fe.firebasestorage.app",
  messagingSenderId: "773568031624",
  appId: "1:773568031624:web:6e8bed9a93e4cb9659683d",
  measurementId: "G-JZNHEXC91J"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

export { database, analytics, storage, auth, messaging };