import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQIJOTk2ONwr_X4rpmszOEeDFyRcVwJnc",
  authDomain: "alleventsclone.firebaseapp.com",
  projectId: "alleventsclone",
  storageBucket: "alleventsclone.firebasestorage.app",
  messagingSenderId: "1031642817166",
  appId: "1:1031642817166:web:f5ddcf9ffb5fc34eb59fdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };