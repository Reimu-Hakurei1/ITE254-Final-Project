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

// Helper: Show non-blocking success message and redirect
function showSuccessAndRedirect(message, redirectUrl) {
  // Create a temporary floating notification
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = '#28a745';
  toast.style.color = 'white';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '8px';
  toast.style.zIndex = '10000';
  toast.style.fontWeight = 'bold';
  toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
  toast.style.fontSize = '1rem';
  document.body.appendChild(toast);
  
  // Redirect after 1 second (message visible for a short time)
  setTimeout(() => {
    window.location.href = redirectUrl;
  }, 1000);
}

// Handle login form
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;

  const persistenceType = remember ? browserLocalPersistence : browserSessionPersistence;

  setPersistence(auth, persistenceType)
    .then(() => signInWithEmailAndPassword(auth, email, password))
    .then(() => {
      showSuccessAndRedirect("Login successful! Redirecting...", "../index.html");
    })
    .catch((error) => {
      alert(error.message); // Keep error alerts as they require user attention
    });
});

// Handle Google login
document.getElementById("googleLogin").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      showSuccessAndRedirect("Login successful with Google! Redirecting...", "../index.html");
    })
    .catch((error) => {
      alert(error.message);
    });
});