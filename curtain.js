// Page Transition Manager with Curtain Animation
class PageTransitionManager {
  constructor() {
    this.isAnimating = false;
    this.transitionEnabled = true;
    this.imagesLoaded = false;
    this.animationTimeout = null;
    this.init();
  }

  init() {
    this.createCurtainElements();
    this.waitForImagesToLoad().then(() => {
      this.imagesLoaded = true;
      this.setupPageLoadAnimation();
      this.interceptLinks();
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
            console.warn('Curtain image failed to load:', img.src);
            checkAllLoaded();
          };
        }
      });
      
      // Fallback: resolve after 2 seconds even if images don't load
      setTimeout(() => {
        if (loadedCount < totalImages) {
          console.warn('Some curtain images timed out, proceeding anyway');
          images.forEach(img => img.classList.add('loaded'));
          resolve();
        }
      }, 2000);
    });
  }

  interceptLinks() {
    // Intercept all internal link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      
      // Check if it's an internal link
      if (href && 
          !href.startsWith('http') && 
          !href.startsWith('//') && 
          !href.startsWith('#') &&
          !href.startsWith('javascript:') &&
          !href.startsWith('mailto:') &&
          !href.startsWith('tel:') &&
          !link.target) {
        
        e.preventDefault();
        
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
    });
  }

  transitionToPage(url) {
    if (!this.transitionEnabled || this.isAnimating) {
      return;
    }
    
    this.transitionEnabled = false;
    this.isAnimating = true;
    
    // Clear any existing timeout
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
    
    // Close curtains
    this.closeCurtains(() => {
      // Navigate after curtains are closed
      this.animationTimeout = setTimeout(() => {
        window.location.href = url;
      }, 100); // Small delay to ensure animation completes
    });
  }

  animateSamePage() {
    if (!this.transitionEnabled || this.isAnimating) {
      return;
    }
    
    this.transitionEnabled = false;
    this.isAnimating = true;
    
    // Clear any existing timeout
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
    
    // Close curtains
    this.closeCurtains(() => {
      // After curtains close, open them again
      this.animationTimeout = setTimeout(() => {
        this.openCurtains();
      }, 400); // Pause between close and open
    });
  }

  closeCurtains(callback) {
    const curtainContainer = document.querySelector('.curtain-container');
    
    if (!curtainContainer) {
      if (callback) callback();
      return;
    }
    
    // Remove any existing animation classes
    curtainContainer.classList.remove('initial-closed', 'curtain-opening', 'curtain-closed');
    
    // Force reflow
    void curtainContainer.offsetWidth;
    
    // Add closing class
    curtainContainer.classList.add('curtain-closing');
    
    // Wait for animation to complete
    this.animationTimeout = setTimeout(() => {
      curtainContainer.classList.remove('curtain-closing');
      curtainContainer.classList.add('curtain-closed');
      
      if (callback) {
        callback();
      }
    }, 600); // Match CSS animation duration
  }

  openCurtains() {
    const curtainContainer = document.querySelector('.curtain-container');
    
    if (!curtainContainer) {
      this.finishOpening();
      return;
    }
    
    // Remove any existing classes
    curtainContainer.classList.remove('initial-closed', 'curtain-closing', 'curtain-closed');
    
    // Force reflow
    void curtainContainer.offsetWidth;
    
    // Add opening class
    curtainContainer.classList.add('curtain-opening');
    
    // Wait for animation to complete
    this.animationTimeout = setTimeout(() => {
      curtainContainer.classList.remove('curtain-opening');
      this.finishOpening();
    }, 600); // Match CSS animation duration
  }

  finishOpening() {
    this.transitionEnabled = true;
    this.isAnimating = false;
    document.body.classList.remove('curtains-loading');
  }

  setupPageLoadAnimation() {
    // Open curtains when page loads and images are ready
    const openCurtainsNow = () => {
      // Small delay to ensure everything is ready
      this.animationTimeout = setTimeout(() => {
        this.openCurtains();
      }, 100);
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      openCurtainsNow();
    } else {
      window.addEventListener('load', openCurtainsNow);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure DOM is fully ready
  setTimeout(() => {
    new PageTransitionManager();
  }, 50);
});

// Handle browser back/forward navigation
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // Page was restored from cache, reinitialize after a small delay
    setTimeout(() => {
      new PageTransitionManager();
    }, 100);
  }
});