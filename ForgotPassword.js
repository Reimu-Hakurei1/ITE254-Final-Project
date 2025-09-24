import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// ✅ Your Firebase config (replace with your real values from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDXWF4fNvq4aS4RWBkqEuykt4zzFdt6cqU",
  authDomain: "ite254-final-project.firebaseapp.com",
  projectId: "ite254-final-project",
  storageBucket: "ite254-final-project.appspot.com", 
  messagingSenderId: "853636478780",
  appId: "1:853636478780:web:bd1af21cb7474926db9039",
  measurementId: "G-ELH7M25FKW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle reset form submit
document.getElementById("resetForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("resetEmail").value;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("✅ Password reset email sent! Check your inbox.");
    window.location.href = "Login.html";
  } catch (error) {
    console.error(error);
    let message = "❌ Something went wrong.";
    switch (error.code) {
      case "auth/invalid-email":
        message = "⚠️ Please enter a valid email address.";
        break;
      case "auth/user-not-found":
        message = "⚠️ No account found with this email.";
        break;
      case "auth/missing-email":
        message = "⚠️ Please enter your email first.";
        break;
      default:
        message = error.message;
    }
    alert(message);
  }
});
