// firebase-config.js
// Firebase Configuration and Authentication
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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Auth State Listener
firebase.auth().onAuthStateChanged(function(user) {
    const signOutBtn = document.getElementById('signOutBtn');
    const userEmailSpan = document.getElementById('userEmail');
    
    if (user) {
        // User is signed in
        if (userEmailSpan) {
            userEmailSpan.textContent = user.email || user.displayName || 'User';
            userEmailSpan.classList.remove('d-none');
        }
        if (signOutBtn) {
            signOutBtn.classList.remove('d-none');
        }
    } else {
        // User is signed out, redirect to login
        window.location.href = "html/Login.html";
    }
});

// Sign Out Function
function setupSignOut() {
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', function() {
            firebase.auth().signOut().then(() => {
                // Sign-out successful
                window.location.href = "html/Login.html";
            }).catch((error) => {
                console.error("Sign out error:", error);
                alert("Error signing out: " + error.message);
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupSignOut();
});