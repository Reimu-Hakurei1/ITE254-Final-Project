// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXWF4fNvq4aS4RWBkqEuykt4zzFdt6cqU",
    authDomain: "ite254-final-project.firebaseapp.com",
    projectId: "ite254-final-project",
    storageBucket: "ite254-final-project.appspot.com",
    messagingSenderId: "853636478780",
    appId: "1:853636478780:web:bd1af21cb7474926db9039",
    measurementId: "G-ELH7M25FKW"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function getSettingsPath() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html' || path.endsWith('/index.html')) {
        return 'html/settings.html';
    } else if (path.includes('/html/')) {
        return 'settings.html';
    } else {
        return 'html/settings.html';
    }
}

function getLoginPath() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html' || path.endsWith('/index.html')) {
        return 'html/Login.html';
    } else if (path.includes('/html/')) {
        return 'Login.html';
    } else {
        return 'html/Login.html';
    }
}

function showGuestLoginLink() {
    const nav = document.querySelector('.navbar-nav');
    if (!nav || document.getElementById('guestLoginLink')) return;

    const item = document.createElement('li');
    item.className = 'nav-item';

    const link = document.createElement('a');
    link.id = 'guestLoginLink';
    link.className = 'nav-link';
    link.href = getLoginPath();
    link.textContent = 'Sign in';

    item.appendChild(link);
    nav.appendChild(item);
}

function getUserDisplayName(user) {
    if (user.displayName) return user.displayName;
    if (user.email) return user.email;
    return 'User';
}

function updateProfileAndDropdown(user) {
    const profileCircle = document.getElementById('userProfile');
    const dropdownMenu = document.getElementById('profileDropdown');
    if (!profileCircle || !dropdownMenu) return;

    profileCircle.classList.remove('d-none');
    
    // Reset to default icon first
    profileCircle.style.backgroundImage = '';
    profileCircle.style.backgroundSize = '';
    profileCircle.style.backgroundPosition = '';
    profileCircle.innerHTML = '<i class="bi bi-person-fill"></i>';
    
    // If user has a photo, try to set it
    if (user.photoURL) {
        // Create an image element to test loading (optional) or just set background
        const img = new Image();
        img.onload = function() {
            // Photo loaded successfully: set background image
            profileCircle.style.backgroundImage = `url(${user.photoURL})`;
            profileCircle.style.backgroundSize = 'cover';
            profileCircle.style.backgroundPosition = 'center';
            profileCircle.innerHTML = ''; // remove icon
        };
        img.onerror = function() {
            // If photo fails to load, keep the icon (already set)
            console.log("Failed to load profile photo, using icon");
        };
        img.src = user.photoURL;
    }

    const displayName = getUserDisplayName(user);
    const settingsUrl = getSettingsPath();
    dropdownMenu.innerHTML = `
        <li class="dropdown-header">${displayName}</li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="${settingsUrl}"><i class="bi bi-gear"></i> Settings</a></li>
        <li><a class="dropdown-item" href="#" id="signOutLink"><i class="bi bi-box-arrow-right"></i> Sign Out</a></li>
    `;

    const signOutLink = document.getElementById('signOutLink');
    if (signOutLink) {
        signOutLink.addEventListener('click', (e) => {
            e.preventDefault();
            firebase.auth().signOut().then(() => {
                window.location.href = getLoginPath();
            }).catch((error) => {
                console.error("Sign out error:", error);
                alert("Error signing out: " + error.message);
            });
        });
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    const profileCircle = document.getElementById('userProfile');
    if (user) {
        document.getElementById('guestLoginLink')?.closest('.nav-item')?.remove();
        updateProfileAndDropdown(user);
        if (typeof bootstrap !== 'undefined' && profileCircle) {
            // Reinitialize dropdown if needed (Bootstrap might already have it)
            // Just ensure it's enabled
            try {
                new bootstrap.Dropdown(profileCircle);
            } catch(e) {}
        }
    } else {
        if (profileCircle) profileCircle.classList.add('d-none');
        showGuestLoginLink();
    }
});
