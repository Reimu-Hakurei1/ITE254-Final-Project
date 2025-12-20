// Page Transition Manager with Curtain Animation
class PageTransitionManager {
  constructor() {
    this.isAnimating = false;
    this.transitionEnabled = true;
    this.imagesLoaded = false;
    this.isReloading = false;
    this.init();
  }

  init() {
    this.createCurtainElements();
    this.waitForImagesToLoad().then(() => {
      this.imagesLoaded = true;
      this.setupPageLoadAnimation();
      this.interceptLinks();
      this.setupReloadDetection();
    });
  }

  createCurtainElements() {
    // Create curtain container if it doesn't exist
    if (!document.querySelector('.curtain-container')) {
      const curtainContainer = document.createElement('div');
      curtainContainer.className = 'curtain-container initial-closed';
      
      // Create left curtain
      const curtainLeft = document.createElement('div');
      curtainLeft.className = 'curtain curtain-left';
      const imgLeft = document.createElement('img');
      imgLeft.src = 'image/Left curtain.png';
      imgLeft.alt = 'Left Curtain';
      imgLeft.className = 'curtain-image';
      curtainLeft.appendChild(imgLeft);
      
      // Create right curtain
      const curtainRight = document.createElement('div');
      curtainRight.className = 'curtain curtain-right';
      const imgRight = document.createElement('img');
      imgRight.src = 'image/Right curtain.png';
      imgRight.alt = 'Right Curtain';
      imgRight.className = 'curtain-image';
      curtainRight.appendChild(imgRight);
      
      curtainContainer.appendChild(curtainLeft);
      curtainContainer.appendChild(curtainRight);
      
      document.body.appendChild(curtainContainer);
      
      // Block interactions while loading
      document.body.classList.add('curtains-loading');
    }
  }

  waitForImagesToLoad() {
    return new Promise((resolve) => {
      const images = document.querySelectorAll('.curtain-image');
      let loadedCount = 0;
      const totalImages = images.length;
      
      if (totalImages === 0) {
        resolve();
        return;
      }
      
      const checkAllLoaded = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          resolve();
        }
      };
      
      images.forEach(img => {
        // Check if image is already loaded
        if (img.complete) {
          img.classList.add('loaded');
          checkAllLoaded();
        } else {
          img.onload = () => {
            img.classList.add('loaded');
            checkAllLoaded();
          };
          img.onerror = () => {
            // Even if image fails to load, mark as loaded to proceed
            checkAllLoaded();
          };
        }
      });
    });
  }

  interceptLinks() {
    // Intercept all internal link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      
      // Check if it's an internal link (not external, not anchor, not javascript)
      if (href && 
          !href.startsWith('http') && 
          !href.startsWith('//') && 
          !href.startsWith('#') &&
          !href.startsWith('javascript:') &&
          !href.startsWith('mailto:') &&
          !href.startsWith('tel:')) {
        
        e.preventDefault();
        e.stopPropagation();
        
        // Get current page and target page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const targetPage = href.split('/').pop();
        
        if (currentPage === targetPage) {
          // Same page - just animate curtains
          this.animateSamePage();
        } else {
          // Different page - navigate
          this.transitionToPage(href);
        }
      }
    }, true); // Use capture phase to catch all clicks
  }

  setupReloadDetection() {
    // Detect browser reload button click
    this.detectReloadButton();
    
    // Detect Ctrl+F5 (hard refresh) and F5
    this.detectKeyboardReload();
    
    // Detect beforeunload (when page is about to reload/close)
    this.setupBeforeUnload();
  }

  detectReloadButton() {
    // This is tricky because browsers don't expose direct reload button events
    // We'll use a combination of methods
    
    // Method 1: Listen for visibility changes (some browsers trigger this on reload)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // Page might be reloading, but could also be tab switch
        // We'll check other signals
      }
    });
    
    // Method 2: Override location.reload()
    const originalReload = window.location.reload;
    window.location.reload = function(forceReload) {
      // Trigger curtain animation before reload
      if (window.pageTransitionManager && !window.pageTransitionManager.isReloading) {
        window.pageTransitionManager.isReloading = true;
        window.pageTransitionManager.animateReload(() => {
          originalReload.call(window.location, forceReload);
        });
        return;
      }
      originalReload.call(window.location, forceReload);
    };
    
    // Store reference for the overridden method
    window.pageTransitionManager = this;
  }

  detectKeyboardReload() {
    document.addEventListener('keydown', (e) => {
      // Check for F5 or Ctrl+F5 or Ctrl+R or Cmd+R (Mac)
      const isReloadKey = 
        e.key === 'F5' || 
        (e.key === 'r' && (e.ctrlKey || e.metaKey)) ||
        (e.key === 'R' && (e.ctrlKey || e.metaKey));
      
      if (isReloadKey && !this.isReloading) {
        e.preventDefault();
        e.stopPropagation();
        
        this.isReloading = true;
        
        // Check if it's a hard refresh (Ctrl+F5 or Cmd+Shift+R)
        const isHardRefresh = (e.ctrlKey && e.shiftKey) || (e.metaKey && e.shiftKey) || e.key === 'F5';
        
        this.animateReload(() => {
          if (isHardRefresh) {
            // Hard refresh - bypass cache
            window.location.href = window.location.href;
          } else {
            // Normal reload
            window.location.reload();
          }
        });
      }
    }, true);
  }

  setupBeforeUnload() {
    window.addEventListener('beforeunload', (e) => {
      // If we're already animating a reload, don't show confirmation
      if (this.isReloading || this.isAnimating) {
        // Some browsers might still show prompt, but we try to prevent it
        return undefined;
      }
      
      // Check if this is likely a navigation (not just closing tab)
      // We'll try to distinguish between page navigation and tab close
      // This is imperfect but helps
      return undefined;
    });
  }

  transitionToPage(url) {
    // Prevent multiple transitions
    if (!this.transitionEnabled || this.isAnimating) {
      return;
    }
    
    this.transitionEnabled = false;
    this.isAnimating = true;
    
    // Disable all interactions
    this.disablePageInteractions();
    
    // Close curtains
    this.closeCurtains();
    
    // Navigate after curtains are closed AND 0.5 second pause
    setTimeout(() => {
      window.location.href = url;
    }, 700); // 600ms for closing animation + 500ms pause
  }

  animateSamePage() {
    // Prevent multiple animations
    if (!this.transitionEnabled || this.isAnimating) {
      return;
    }
    
    this.transitionEnabled = false;
    this.isAnimating = true;
    
    // Disable all interactions
    this.disablePageInteractions();
    
    // Close curtains
    this.closeCurtains();
    
    // After curtains close and pause, open them again
    setTimeout(() => {
      this.openCurtains();
    }, 700); // 600ms for closing + 500ms pause
  }

  animateReload(callback) {
    // Prevent multiple animations
    if (this.isAnimating) {
      // If already animating, just execute callback immediately
      if (callback) setTimeout(callback, 100);
      return;
    }
    
    this.isAnimating = true;
    this.transitionEnabled = false;
    
    // Disable all interactions
    this.disablePageInteractions();
    
    // Close curtains
    this.closeCurtains();
    
    // Execute callback after curtains are closed
    setTimeout(() => {
      if (callback) {
        callback();
      }
    }, 700); // 600ms for closing + 500ms pause
  }

  closeCurtains() {
    const curtainContainer = document.querySelector('.curtain-container');
    
    if (!curtainContainer) return;
    
    // Reset position first
    curtainContainer.className = 'curtain-container';
    
    // Force reflow
    curtainContainer.offsetHeight;
    
    // Start closing animation
    curtainContainer.className = 'curtain-container curtain-closing';
    
    // After closing animation completes, set to closed state
    setTimeout(() => {
      curtainContainer.className = 'curtain-container curtain-closed';
    }, 600);
  }

  openCurtains() {
    const curtainContainer = document.querySelector('.curtain-container');
    
    if (!curtainContainer) return;
    
    // Wait 0.5 seconds before opening
    setTimeout(() => {
      // Start opening animation
      curtainContainer.className = 'curtain-container curtain-opening';
      
      // After opening animation completes, hide curtains and enable interactions
      setTimeout(() => {
        curtainContainer.className = 'curtain-container';
        this.transitionEnabled = true;
        this.isAnimating = false;
        this.isReloading = false;
        this.enablePageInteractions();
        document.body.classList.remove('curtains-loading');
      }, 600);
    }, 500); // 0.5 second pause before opening
  }

  setupPageLoadAnimation() {
    // Open curtains when page loads and images are ready
    if (document.readyState === 'complete') {
      this.openCurtains();
    } else {
      window.addEventListener('load', () => {
        this.openCurtains();
      });
    }
  }

  disablePageInteractions() {
    // Add class to body to block interactions via CSS
    document.body.style.pointerEvents = 'none';
    document.body.style.cursor = 'wait';
    
    // Disable all buttons and links
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
    interactiveElements.forEach(el => {
      el.setAttribute('data-was-disabled', el.disabled || el.getAttribute('disabled') ? 'true' : 'false');
      el.disabled = true;
      el.style.pointerEvents = 'none';
      el.style.cursor = 'wait';
    });
  }

  enablePageInteractions() {
    // Remove blocking styles from body
    document.body.style.pointerEvents = '';
    document.body.style.cursor = '';
    
    // Re-enable all buttons and links
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
    interactiveElements.forEach(el => {
      const wasDisabled = el.getAttribute('data-was-disabled');
      if (wasDisabled === 'false') {
        el.disabled = false;
        el.style.pointerEvents = '';
        el.style.cursor = '';
      }
      el.removeAttribute('data-was-disabled');
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const pageTransition = new PageTransitionManager();
  
  // If page is loaded via browser back/forward, also open curtains
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      const pageTransition = new PageTransitionManager();
    }
  });
});