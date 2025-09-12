import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8RXizk18yOiX_oDg23B9O8GK-pDhII0o",
  authDomain: "casinopolygon.firebaseapp.com",
  projectId: "casinopolygon",
  storageBucket: "casinopolygon.appspot.com",
  messagingSenderId: "718202367788",
  appId: "1:718202367788:web:2714b8f53ebc048e4ac689",
  measurementId: "G-3CDVCHR191"
};

if (sessionStorage.getItem("reloadedOnce")) sessionStorage.removeItem("reloadedOnce");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const popUp = document.getElementById('authPopUp');    
const popUp2 = document.getElementById('loginPopUp');
const blur = document.getElementById('blur');
let popupOpen = false;

document.getElementById('signup').addEventListener('click', () => { popupOpen = true; popUp.style.display = "flex"; blur.style.display = "block"; });
document.getElementById('signin').addEventListener('click', () => { popupOpen = true; popUp2.style.display = "flex"; blur.style.display = "block"; });

function closePopup() {
  popupOpen = false;
  popUp.style.display = 'none';
  popUp2.style.display = 'none';
  blur.style.display = 'none';
}

document.getElementById('exit').addEventListener('click', closePopup);
document.getElementById('exit2').addEventListener('click', closePopup);
blur.addEventListener('click', closePopup);

function updateUI(username) {
  document.getElementById('signInAs').innerHTML = 'Logged as ' + username;
  document.getElementById('signin').style.display = 'none';
  document.getElementById('signup').style.display = 'none';
  document.getElementById('wrapper').style.visibility = 'visible';
  document.querySelector('.polygon_moving_logo').style.visibility = 'hidden';
  document.getElementById('deux').style.visibility = 'hidden';
  document.getElementById('trois').style.visibility = 'hidden';
}

document.getElementById('signUPFrm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value.trim();
  if (!email) { document.getElementById('emailWarning').style.display = "block"; return; }
  else document.getElementById('emailWarning').style.display = "none";
  if (password.length <= 7) { document.getElementById('passwordWarning').style.display = "block"; return; }
  else document.getElementById('passwordWarning').style.display = "none";
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), { username, email, createdAt: new Date() });
    updateUI(username);
    closePopup();
    document.getElementById('signUPFrm').reset();
  } catch (err) { console.error(err.message); }
});

document.getElementById('loginFrm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const snap = await getDoc(doc(db, "users", user.uid));
    const username = snap.exists() ? snap.data().username : "NoName";
    updateUI(username);
    await setDoc(doc(db, "users", user.uid), { email, lastLogin: new Date() }, { merge: true });
    closePopup();
  } catch (err) { console.error(err.message); alert("Login failed: " + err.message); }
});

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

const githubProvider = new GithubAuthProvider();
githubProvider.addScope('read:user');
githubProvider.addScope('user:email');

document.querySelector('.google-btn').addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await setDoc(doc(db, "users", user.uid), { username: user.displayName || "NoName", email: user.email, createdAt: new Date() }, { merge: true });
    updateUI(user.displayName || "NoName");
    closePopup();
  } catch (err) { console.error(err.message); }
});

document.querySelector('.github-btn').addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    await setDoc(doc(db, "users", user.uid), { username: user.displayName || "NoName", email: user.email, createdAt: new Date() }, { merge: true });
    updateUI(user.displayName || "NoName");
    closePopup();
  } catch (err) { console.error(err.message); }
});

document.querySelector('.googleLoginBtn').addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const snap = await getDoc(doc(db, "users", user.uid));
    const username = snap.exists() ? snap.data().username : user.displayName || "NoName";
    await setDoc(doc(db, "users", user.uid), { lastLogin: new Date() }, { merge: true });
    updateUI(username);
    closePopup();
  } catch (err) { console.error(err.message); }
});

document.querySelector('.githubLoginBtn').addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    const snap = await getDoc(doc(db, "users", user.uid));
    const username = snap.exists() ? snap.data().username : user.displayName || "NoName";
    await setDoc(doc(db, "users", user.uid), { lastLogin: new Date() }, { merge: true });
    updateUI(username);
    closePopup();
  } catch (err) { console.error(err.message); }
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const snap = await getDoc(doc(db, "users", user.uid));
    const username = snap.exists() ? snap.data().username : "NoName";
    updateUI(username);
    document.getElementById('logout_btn').addEventListener('click', async () => {
      await signOut(auth);
      location.reload();
    });
  }
});

if (window.innerWidth < 780) {
  console.log(window.innerWidth);
  document.getElementById('title2').style.fontSize = '2.7rem';
  document.getElementById('polygon_logo').style.width = '40vw'
  const money = document.getElementById('money');
  money.style.width = '50%';
  document.getElementById('money2').style.fontSize = '0.8rem';
  document.getElementById('bank_balance').style.fontSize = '0.9rem';
}
