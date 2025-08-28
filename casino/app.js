// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

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