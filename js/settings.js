// settings.js - Profile management for the settings page

document.addEventListener('DOMContentLoaded', function() {
    const auth = firebase.auth();

    auth.onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = 'Login.html';
            return;
        }
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
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');

    function splitDisplayName(displayName) {
        if (!displayName) return { firstName: '', lastName: '' };
        const parts = displayName.trim().split(' ');
        if (parts.length === 1) return { firstName: parts[0], lastName: '' };
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ');
        return { firstName, lastName };
    }

    function loadUserData() {
        profileEmail.value = user.email;
        profileUserEmail.textContent = user.email;

        const displayName = user.displayName || '';
        profileUserName.textContent = displayName || 'User';
        const { firstName, lastName } = splitDisplayName(displayName);
        profileFirstName.value = firstName;
        profileLastName.value = lastName;
    }

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

    // ---- Delete Account Logic (supports both email/password and Google) ----
    async function deleteAccount() {
        const confirmDelete = confirm(
            'WARNING: This action is permanent!\n\n' +
            'Are you sure you want to delete your account?\n' +
            'All your user data will be lost forever.'
        );
        if (!confirmDelete) return;

        // Check what provider the user used to sign in
        const providerData = user.providerData;
        const isGoogle = providerData.some(p => p.providerId === 'google.com');

        let reauthSuccess = false;

        if (isGoogle) {
            // Re-authenticate with Google popup
            const provider = new firebase.auth.GoogleAuthProvider();
            try {
                await user.reauthenticateWithPopup(provider);
                reauthSuccess = true;
            } catch (error) {
                console.error('Google reauthentication error:', error);
                if (error.code === 'auth/popup-blocked') {
                    alert('Popup was blocked. Please allow popups for this site and try again.');
                } else if (error.code === 'auth/cancelled-popup-request') {
                    alert('Sign-in popup was cancelled.');
                } else {
                    alert('Reauthentication failed: ' + error.message);
                }
                return;
            }
        } else {
            // Email/password user: ask for password
            const password = prompt('Please enter your password to confirm account deletion:');
            if (!password) {
                alert('Deletion cancelled – password required.');
                return;
            }
            const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
            try {
                await user.reauthenticateWithCredential(credential);
                reauthSuccess = true;
            } catch (error) {
                console.error('Password reauthentication error:', error);
                let errorMsg = error.message;
                if (error.code === 'auth/wrong-password') {
                    errorMsg = 'Incorrect password. Deletion cancelled.';
                } else if (error.code === 'auth/requires-recent-login') {
                    errorMsg = 'Please sign out and sign in again, then try deleting your account.';
                }
                alert('Failed to reauthenticate: ' + errorMsg);
                return;
            }
        }

        if (reauthSuccess) {
            try {
                await user.delete();
                window.location.href = 'Login.html';
            } catch (error) {
                console.error('Delete account error:', error);
                alert('Error deleting account: ' + error.message);
            }
        }
    }

    saveProfileBtn.addEventListener('click', saveProfile);
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', deleteAccount);
    }

    loadUserData();
}