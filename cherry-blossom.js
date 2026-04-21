// cherry-blossom.js - Cherry Blossom Leaf Falling Effect
document.addEventListener('DOMContentLoaded', function() {
    let cherryEnabled = localStorage.getItem('cherryEnabled') === 'true';
    let cherryPaused = false;
    let leaves = [];
    let cherryContainer;
    
    console.log('Cherry blossom initialized. Enabled:', cherryEnabled);
    
    function initCherry() {
        console.log('Initializing cherry blossom leaves...');
        if (cherryContainer) cleanupCherry();
        
        cherryContainer = document.createElement('div');
        cherryContainer.className = 'cherry-container';
        cherryContainer.id = 'cherryContainer';
        document.body.appendChild(cherryContainer);
        
        createLeaves(60);
        startReplenishInterval();
        checkPerformance();
        document.addEventListener('themeChanged', updateCherryTheme);
        updateCherryTheme();
        addNotificationStyles();
        
        // Check if images load, add fallback class if needed
        setTimeout(() => {
            document.querySelectorAll('.cherry-leaf').forEach(leaf => {
                const bgImage = window.getComputedStyle(leaf).backgroundImage;
                if (bgImage === 'none' || bgImage.includes('url("")')) {
                    leaf.classList.add('fallback');
                }
            });
        }, 500);
        
        console.log('Cherry blossom initialized successfully');
    }
    
    function createLeaves(count) {
        for (let i = 0; i < count; i++) createLeaf(true);
    }
    
    function createLeaf(isInitial = false) {
        const leaf = document.createElement('div');
        const type = Math.random() < 0.5 ? 'type1' : 'type2';
        const sizes = ['tiny', 'small', 'medium', 'large'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        leaf.className = `cherry-leaf ${size} ${type}`;
        
        const startX = Math.random() * 100;
        const endSway = (Math.random() - 0.5) * 100;
        const duration = 20 + Math.random() * 20;
        const delay = isInitial ? Math.random() * -duration : 0;
        
        leaf.style.setProperty('--sway-end', `${endSway}px`);
        leaf.style.left = `${startX}vw`;
        leaf.style.animationDuration = `${duration}s`;
        leaf.style.animationDelay = `${delay}s`;
        leaf.style.opacity = (0.6 + Math.random() * 0.35).toString();
        
        cherryContainer.appendChild(leaf);
        leaves.push(leaf);
        
        setTimeout(() => {
            if (leaf.parentNode && !cherryPaused && cherryEnabled) {
                leaf.remove();
                leaves = leaves.filter(l => l !== leaf);
                createLeaf();
            }
        }, (duration + Math.abs(delay)) * 1000);
    }
    
    let replenishInterval;
    function startReplenishInterval() {
        if (replenishInterval) clearInterval(replenishInterval);
        replenishInterval = setInterval(() => {
            if (!cherryPaused && cherryEnabled && leaves.length < 100) {
                createLeaf();
            }
        }, 400);
    }
    
    function pauseCherry() {
        cherryPaused = true;
        leaves.forEach(leaf => leaf.style.animationPlayState = 'paused');
        if (replenishInterval) clearInterval(replenishInterval);
    }
    
    function resumeCherry() {
        cherryPaused = false;
        leaves.forEach(leaf => leaf.style.animationPlayState = 'running');
        startReplenishInterval();
    }
    
    function updateCherryTheme() {
        if (cherryContainer) {
            cherryContainer.style.display = 'none';
            void cherryContainer.offsetHeight;
            cherryContainer.style.display = '';
        }
    }
    
    function checkPerformance() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (prefersReducedMotion || isMobile) {
            document.body.classList.add('performance-mode');
            const existingLeaves = document.querySelectorAll('.cherry-leaf');
            const leavesToRemove = existingLeaves.length - 35;
            for (let i = 0; i < leavesToRemove; i++) {
                if (existingLeaves[i]) existingLeaves[i].remove();
            }
        }
    }
    
    function cleanupCherry() {
        console.log('Cleaning up cherry blossom');
        if (replenishInterval) clearInterval(replenishInterval);
        if (cherryContainer) {
            cherryContainer.remove();
            cherryContainer = null;
        }
        leaves = [];
    }
    
    function addNotificationStyles() {
        if (!document.querySelector('#cherry-notification-style')) {
            const style = document.createElement('style');
            style.id = 'cherry-notification-style';
            style.textContent = `
                @keyframes cherrySlideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes cherryFadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                .cherry-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #ff9a9e, #fecfef);
                    color: #5a2e2e;
                    padding: 12px 24px;
                    border-radius: 12px;
                    z-index: 10002;
                    animation: cherrySlideIn 0.3s ease-out, cherryFadeOut 0.3s ease-in 2.7s;
                    font-weight: 600;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.3);
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function showCherryNotification(enabled) {
        const notification = document.createElement('div');
        notification.className = 'cherry-notification';
        notification.textContent = enabled ? '🌸 Cherry blossom leaves falling!' : '🌸 Cherry blossom effect disabled';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
    
    function updateCherryToggleButton() {
        const cherryToggle = document.getElementById('cherryToggle');
        if (cherryToggle) {
            cherryToggle.innerHTML = '🌸';
            if (cherryEnabled) {
                cherryToggle.classList.add('btn-pink');
                cherryToggle.classList.remove('btn-outline-dark');
                cherryToggle.title = 'Disable cherry blossom';
            } else {
                cherryToggle.classList.remove('btn-pink');
                cherryToggle.classList.add('btn-outline-dark');
                cherryToggle.title = 'Enable cherry blossom';
            }
        }
    }
    
    window.cherryBlossom = {
        init: () => { if (cherryEnabled) initCherry(); },
        toggle: function() {
            cherryEnabled = !cherryEnabled;
            localStorage.setItem('cherryEnabled', cherryEnabled);
            if (cherryEnabled) {
                initCherry();
                showCherryNotification(true);
            } else {
                cleanupCherry();
                showCherryNotification(false);
            }
            updateCherryToggleButton();
            document.dispatchEvent(new CustomEvent('cherryToggled', { detail: { enabled: cherryEnabled } }));
            return cherryEnabled;
        },
        isEnabled: () => cherryEnabled,
        pause: () => { if (!cherryPaused) pauseCherry(); },
        resume: () => { if (cherryPaused) resumeCherry(); }
    };
    
    function setupCherryToggle() {
        const cherryToggle = document.getElementById('cherryToggle');
        if (cherryToggle) {
            cherryToggle.addEventListener('click', () => window.cherryBlossom.toggle());
            updateCherryToggleButton();
            document.addEventListener('cherryToggled', () => updateCherryToggleButton());
        }
    }
    
    // Auto-enable in April (spring) or if previously enabled
    const now = new Date();
    const isSpring = now.getMonth() === 3; // April
    if (isSpring && localStorage.getItem('cherryEnabled') === null) {
        localStorage.setItem('cherryEnabled', 'true');
        cherryEnabled = true;
        console.log('Auto-enabling cherry blossom for spring');
    }
    
    setupCherryToggle();
    if (cherryEnabled) setTimeout(() => window.cherryBlossom.init(), 500);
    
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key === 'c') {
            e.preventDefault();
            window.cherryBlossom.toggle();
        }
    });
});