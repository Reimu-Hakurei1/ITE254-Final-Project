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

// Helper: get the correct path to settings.html based on current location
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

// Helper: get login path
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

function getUserDisplayName(user) {
    if (user.displayName) return user.displayName;
    if (user.email) return user.email;
    return 'User';
}

function getUserInitials(user) {
    const name = getUserDisplayName(user);
    if (name.includes('@')) return name[0].toUpperCase();
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
}

function updateProfileAndDropdown(user) {
    const profileCircle = document.getElementById('userProfile');
    const dropdownMenu = document.getElementById('profileDropdown');
    if (!profileCircle || !dropdownMenu) return;

    const initials = getUserInitials(user);
    profileCircle.textContent = initials;
    profileCircle.title = getUserDisplayName(user);
    profileCircle.classList.remove('d-none');
    if (user.photoURL) {
        profileCircle.style.backgroundImage = `url(${user.photoURL})`;
        profileCircle.style.backgroundSize = 'cover';
        profileCircle.style.backgroundPosition = 'center';
        profileCircle.textContent = '';
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
        updateProfileAndDropdown(user);
        if (typeof bootstrap !== 'undefined' && profileCircle) {
            new bootstrap.Dropdown(profileCircle);
        }
    } else {
        if (profileCircle) profileCircle.classList.add('d-none');
        // Only redirect if not already on login/register/settings page
        const current = window.location.pathname;
        if (!current.includes('Login.html') && !current.includes('Register.html') && !current.includes('settings.html')) {
            window.location.href = getLoginPath();
        }
    }
});