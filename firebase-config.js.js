// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyDXWF4fNvq4aS4RWBkqEuykt4zzFdt6cqU",
  authDomain: "ite254-final-project.firebaseapp.com",
  projectId: "ite254-final-project",
  storageBucket: "ite254-final-project.appspot.com",
  messagingSenderId: "853636478780",
  appId: "1:853636478780:web:YOUR_APP_ID" // replace with your appId from Firebase console
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
