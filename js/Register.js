import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  updateProfile 
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
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Email Registration
document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // update display name
      return updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });
    })
    .then(() => {
      alert("Account created successfully! Redirecting to login...");
      window.location.href = "Login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Google Register
document.getElementById("googleRegister").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      alert("Registered with Google! Redirecting to login...");
      window.location.href = "Login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
