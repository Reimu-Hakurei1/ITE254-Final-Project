import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence 
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDXWF4fNvq4aS4RWBkqEuykt4zzFdt6cqU",
  authDomain: "ite254-final-project.firebaseapp.com",
  projectId: "ite254-final-project",
  storageBucket: "ite254-final-project.appspot.com",
  messagingSenderId: "853636478780",
  appId: "1:853636478780:web:bd1af21cb7474926db9039",
  measurementId: "G-ELH7M25FKW"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle login form
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;

  // persistence: remember = local, otherwise session
  const persistenceType = remember ? browserLocalPersistence : browserSessionPersistence;

  setPersistence(auth, persistenceType)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .then(() => {
      alert("Login successful! Redirecting...");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Handle Google login
document.getElementById("googleLogin").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      alert("Login successful with Google! Redirecting...");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
