
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBhQhfW-cWT1_P0qkXt2nrBbfuljQ-aPfM",
  authDomain: "connectverse-b708e.firebaseapp.com",
  projectId: "connectverse-b708e",
  storageBucket: "connectverse-b708e.appspot.com",
  messagingSenderId: "205443753466",
  appId: "1:205443753466:web:50cf6702f460686c5bb043",
  measurementId: "G-Y7HJ58BK7G"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      console.log(profilePic);
      console.log(name);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      window.location.reload(true)
    })
    .catch((error) => {
      console.log(error);
    });
};