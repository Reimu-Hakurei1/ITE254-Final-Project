// snow.js - Snowfall Effect
document.addEventListener('DOMContentLoaded', function() {
    // Check if snow is enabled in localStorage
    let snowEnabled = localStorage.getItem('snowEnabled') === 'true';
    let snowPaused = false;
    let snowflakes = [];
    let snowContainer;
    
    console.log('Snow initialized. Enabled:', snowEnabled);
    
    // Initialize snow effect
    function initSnow() {
        console.log('Initializing snow...');
        
        // Create snow container
        snowContainer = document.createElement('div');
        snowContainer.className = 'snow-container';
        snowContainer.id = 'snowContainer';
        document.body.appendChild(snowContainer);
        
        // Create initial snowflakes
        createSnowflakes(80);
        
        // Start snowfall animation
        animateSnow();
        
        // Check for performance mode
        checkPerformance();
        
        // Listen for theme changes
        document.addEventListener('themeChanged', updateSnowTheme);
        
        // Initial theme update
        updateSnowTheme();
        
        // Add notification CSS
        addNotificationStyles();
        
        console.log('Snow initialized successfully');
    }
    
    function createSnowflakes(count) {
        console.log(`Creating ${count} snowflakes`);
        for (let i = 0; i < count; i++) {
            createSnowflake(true);
        }
    }
    
    function createSnowflake(isInitial = false) {
        const snowflake = document.createElement('div');
        const sizes = ['small', 'medium', 'large', 'xlarge'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        
        snowflake.className = `snowflake ${size}`;
        
        // Random position
        const startX = Math.random() * 100;
        const endSway = (Math.random() - 0.5) * 100;
        
        // Random animation properties
        const duration = 15 + Math.random() * 20; // 15-35 seconds
        const delay = isInitial ? Math.random() * -duration : 0;
        
        // Set CSS custom properties
        snowflake.style.setProperty('--sway-end', `${endSway}px`);
        snowflake.style.left = `${startX}vw`;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;
        
        // Random opacity
        snowflake.style.opacity = (0.6 + Math.random() * 0.4).toString();
        
        // Add to container
        snowContainer.appendChild(snowflake);
        snowflakes.push(snowflake);
        
        // Remove snowflake after animation completes
        setTimeout(() => {
            if (snowflake.parentNode && !snowPaused && snowEnabled) {
                snowflake.remove();
                snowflakes = snowflakes.filter(s => s !== snowflake);
                createSnowflake();
            }
        }, (duration + Math.abs(delay)) * 1000);
    }
    
    function animateSnow() {
        // Create new snowflakes periodically
        setInterval(() => {
            if (!snowPaused && snowEnabled && snowflakes.length < 120) {
                createSnowflake();
            }
        }, 300);
    }
    
    function pauseSnow() {
        console.log('Pausing snow');
        snowflakes.forEach(snowflake => {
            snowflake.style.animationPlayState = 'paused';
        });
    }
    
    function resumeSnow() {
        console.log('Resuming snow');
        snowflakes.forEach(snowflake => {
            snowflake.style.animationPlayState = 'running';
        });
    }
    
    function updateSnowTheme() {
        // This function will be called when theme changes
        if (snowContainer) {
            // Force reflow to update styles
            snowContainer.style.display = 'none';
            void snowContainer.offsetHeight;
            snowContainer.style.display = '';
        }
    }
    
    function checkPerformance() {
        // Check if user has reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Check device performance
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (prefersReducedMotion || isMobile) {
            document.body.classList.add('performance-mode');
            
            // Reduce snowflake count on mobile or reduced motion
            const existingFlakes = document.querySelectorAll('.snowflake');
            const flakesToRemove = existingFlakes.length - 40;
            
            if (flakesToRemove > 0) {
                for (let i = 0; i < flakesToRemove; i++) {
                    if (existingFlakes[i]) {
                        existingFlakes[i].remove();
                    }
                }
            }
        }
    }
    
    function cleanupSnow() {
        console.log('Cleaning up snow');
        if (snowContainer) {
            snowContainer.remove();
            snowContainer = null;
        }
        snowflakes = [];
    }
    
    function addNotificationStyles() {
        if (!document.querySelector('#snow-notification-style')) {
            const style = document.createElement('style');
            style.id = 'snow-notification-style';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
                
                .snow-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    z-index: 10002;
                    animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-in 2.7s;
                    font-weight: 600;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.2);
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function showSnowNotification(enabled) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'snow-notification';
        notification.style.background = enabled ? 
            'linear-gradient(135deg, #0a7ff5 0%, #00b4d8 100%)' : 
            'linear-gradient(135deg, #f5b10a 0%, #ff6b00 100%)';
        
        notification.textContent = enabled ? '❄️ Snow effect enabled!' : '❄️ Snow effect disabled';
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    function updateNavSnowToggle() {
        const navSnowToggle = document.getElementById('navSnowToggle');
        if (navSnowToggle) {
            const isEnabled = snowEnabled;
            navSnowToggle.innerHTML = isEnabled ? 
                '<i class="bi bi-snow"></i>' : 
                '<i class="bi bi-snow"></i>';
            
            navSnowToggle.classList.toggle('btn-outline-dark', !isEnabled);
            navSnowToggle.classList.toggle('btn-primary', isEnabled);
            navSnowToggle.setAttribute('title', isEnabled ? 'Disable snow effect' : 'Enable snow effect');
            
            console.log('Updated navbar button. Enabled:', isEnabled);
        }
    }
    
    // Public API
    window.snowEffect = {
        init: function() {
            if (snowEnabled) {
                initSnow();
            }
        },
        
        toggle: function() {
            console.log('Toggling snow. Current state:', snowEnabled);
            snowEnabled = !snowEnabled;
            localStorage.setItem('snowEnabled', snowEnabled);
            
            if (snowEnabled) {
                initSnow();
                showSnowNotification(true);
                console.log('Snow enabled');
            } else {
                cleanupSnow();
                showSnowNotification(false);
                console.log('Snow disabled');
            }
            
            // Update navbar button
            updateNavSnowToggle();
            
            // Dispatch event for other components
            document.dispatchEvent(new CustomEvent('snowToggled', { detail: { enabled: snowEnabled } }));
            
            return snowEnabled;
        },
        
        isEnabled: function() {
            return snowEnabled;
        },
        
        pause: function() {
            if (!snowPaused) {
                snowPaused = true;
                pauseSnow();
            }
        },
        
        resume: function() {
            if (snowPaused) {
                snowPaused = false;
                resumeSnow();
            }
        },
        
        setIntensity: function(intensity) {
            // intensity: 'low', 'medium', 'high'
            localStorage.setItem('snowIntensity', intensity);
            
            if (snowContainer) {
                // Remove all snowflakes
                snowflakes.forEach(flake => flake.remove());
                snowflakes = [];
                
                // Create new snowflakes based on intensity
                let count;
                switch(intensity) {
                    case 'low': count = 40; break;
                    case 'medium': count = 80; break;
                    case 'high': count = 120; break;
                    default: count = 80;
                }
                
                createSnowflakes(count);
            }
        }
    };
    
    // Setup navbar snow toggle button
    function setupNavSnowToggle() {
        const navSnowToggle = document.getElementById('navSnowToggle');
        if (navSnowToggle) {
            console.log('Setting up navbar snow toggle');
            
            // Update button text based on current state
            const updateSnowButton = () => {
                const isEnabled = snowEnabled;
                navSnowToggle.innerHTML = isEnabled ? 
                    '<i class="bi bi-snow"></i>' : 
                    '<i class="bi bi-snow"></i>';
                
                // Update button style
                navSnowToggle.classList.toggle('btn-outline-dark', !isEnabled);
                navSnowToggle.classList.toggle('btn-primary', isEnabled);
                navSnowToggle.setAttribute('title', isEnabled ? 'Disable snow effect' : 'Enable snow effect');
            };
            
            navSnowToggle.addEventListener('click', function() {
                console.log('Navbar snow button clicked');
                window.snowEffect.toggle();
            });
            
            // Set initial state
            updateSnowButton();
            
            // Listen for snow toggle events
            document.addEventListener('snowToggled', function(event) {
                updateSnowButton();
            });
        }
    }
    
    // Check if it's December (snow season!)
    const now = new Date();
    const isDecember = now.getMonth() === 11; // December is month 11 (0-indexed)
    
    // Enable snow by default in December, or if previously enabled
    if (isDecember && localStorage.getItem('snowEnabled') === null) {
        localStorage.setItem('snowEnabled', 'true');
        snowEnabled = true;
        console.log('Auto-enabling snow for December');
    }
    
    // Setup navbar toggle
    setupNavSnowToggle();
    
    // Initialize snow if enabled
    if (snowEnabled) {
        console.log('Auto-starting snow effect');
        setTimeout(() => {
            window.snowEffect.init();
        }, 500);
    }
    
    // Add keyboard shortcut (Ctrl+Alt+S to toggle snow)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.altKey && e.key === 's') {
            e.preventDefault();
            window.snowEffect.toggle();
        }
    });
});