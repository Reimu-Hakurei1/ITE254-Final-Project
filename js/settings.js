// settings.js - Profile management for the settings page

document.addEventListener('DOMContentLoaded', function() {
    const auth = firebase.auth();

    // Wait for auth state to resolve before proceeding
    auth.onAuthStateChanged(function(user) {
        if (!user) {
            // Only redirect if definitely not logged in
            window.location.href = 'Login.html';
            return;
        }

        // User is logged in – load and setup the page
        setupSettingsPage(user);
    });
});

function setupSettingsPage(user) {
    // DOM elements
    const profileUserName = document.getElementById('profileUserName');
    const profileUserEmail = document.getElementById('profileUserEmail');
    const profileFirstName = document.getElementById('profileFirstName');
    const profileLastName = document.getElementById('profileLastName');
    const profileEmail = document.getElementById('profileEmail');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const saveSuccess = document.getElementById('saveSuccess');

    // Function to split display name into first and last name
    function splitDisplayName(displayName) {
        if (!displayName) return { firstName: '', lastName: '' };
        const parts = displayName.trim().split(' ');
        if (parts.length === 1) return { firstName: parts[0], lastName: '' };
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ');
        return { firstName, lastName };
    }

    // Load user data into form
    function loadUserData() {
        profileEmail.value = user.email;
        profileUserEmail.textContent = user.email;

        const displayName = user.displayName || '';
        profileUserName.textContent = displayName || 'User';
        const { firstName, lastName } = splitDisplayName(displayName);
        profileFirstName.value = firstName;
        profileLastName.value = lastName;
    }

    // Save changes: update display name in Firebase
    async function saveProfile() {
        const firstName = profileFirstName.value.trim();
        const lastName = profileLastName.value.trim();
        let newDisplayName = firstName;
        if (lastName) newDisplayName += ' ' + lastName;

        if (newDisplayName === (user.displayName || '')) {
            showSuccessMessage('No changes to save');
            return;
        }

        saveProfileBtn.disabled = true;
        saveProfileBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Saving...';

        try {
            await user.updateProfile({ displayName: newDisplayName });
            profileUserName.textContent = newDisplayName || 'User';
            showSuccessMessage('Profile saved successfully!');
            setTimeout(() => location.reload(), 1500);
        } catch (error) {
            console.error('Error updating profile:', error);
            showErrorMessage(error.message);
        } finally {
            saveProfileBtn.disabled = false;
            saveProfileBtn.innerHTML = '<i class="fas fa-save me-2"></i> Save Changes';
        }
    }

    function showSuccessMessage(msg) {
        saveSuccess.textContent = msg;
        saveSuccess.className = 'alert alert-success mt-3';
        saveSuccess.style.display = 'block';
        setTimeout(() => {
            saveSuccess.style.display = 'none';
        }, 3000);
    }

    function showErrorMessage(msg) {
        alert('Error: ' + msg);
    }

    saveProfileBtn.addEventListener('click', saveProfile);
    loadUserData();
}