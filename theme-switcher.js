// theme-switcher.js
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle button icon based on current theme
    updateToggleIcon(savedTheme);
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update toggle button icon
        updateToggleIcon(newTheme);
        
        // Update aria-label
        themeToggle.setAttribute('aria-label', 
            newTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
        );
    });
    
    function updateToggleIcon(theme) {
        const lightIcon = themeToggle.querySelector('.light-icon');
        const darkIcon = themeToggle.querySelector('.dark-icon');
        
        if (theme === 'dark') {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
            themeToggle.setAttribute('aria-label', 'Switch to light theme');
        } else {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
            themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        }
    }
});