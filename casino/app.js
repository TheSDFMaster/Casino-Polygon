// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { 
  getAuth, 
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA8RXizk18yOiX_oDg23B9O8GK-pDhII0o",
    authDomain: "casinopolygon.firebaseapp.com",
    projectId: "casinopolygon",
    storageBucket: "casinopolygon.appspot.com",
    messagingSenderId: "718202367788",
    appId: "1:718202367788:web:2714b8f53ebc048e4ac689",
    measurementId: "G-3CDVCHR191"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

signInAnonymously(auth)
    .then(() => console.log("Signed in anonymously"))
    .catch((error) => console.error("Auth error:", error));

const popUp = document.getElementById('authPopUp');    
const blur = document.getElementById('blur');

document.getElementById('signup').addEventListener('click', () => {
    popUp.style.display = "flex";
    blur.style.display = "block";
});

document.getElementById('exit').addEventListener('click', () => {
    popUp.style.display = 'none';
    blur.style.display = 'none';
});

blur.addEventListener('click', () => {
    popUp.style.display = 'none';
    blur.style.display = 'none';
});

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
  } catch (error) {
    console.error(error.message);
  }
}

async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
  } catch (error) {
    console.error(error.message);
  }
}

async function logOut() {
  await signOut(auth);
  console.log("User signed out");
}

async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google user:", result.user);
  } catch (error) {
    console.error(error.message);
  }
}

async function signInWithGitHub() {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    console.log("GitHub user:", result.user);
  } catch (error) {
    console.error(error.message);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user);
    // Here you can update the UI to show logged-in state
  } else {
    console.log("No user logged in");
    // Update UI to show login buttons
  }
});
