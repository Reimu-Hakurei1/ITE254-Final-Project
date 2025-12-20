// Enhanced reload detection
(function() {
  // Store original functions
  const originalLocationReload = window.location.reload;
  const originalLocationAssign = window.location.assign;
  const originalLocationReplace = window.location.replace;
  
  // Flag to track if we're in a curtain animation
  let isCurtainAnimation = false;
  
  // Override location.reload()
  window.location.reload = function(forceReload) {
    if (!isCurtainAnimation) {
      isCurtainAnimation = true;
      triggerCurtainAnimation(() => {
        originalLocationReload.call(window.location, forceReload);
      });
      return;
    }
    originalLocationReload.call(window.location, forceReload);
  };
  
  // Override navigation methods that might be used for reloads
  window.location.assign = function(url) {
    if (!isCurtainAnimation && url === window.location.href) {
      isCurtainAnimation = true;
      triggerCurtainAnimation(() => {
        originalLocationAssign.call(window.location, url);
      });
      return;
    }
    originalLocationAssign.call(window.location, url);
  };
  
  window.location.replace = function(url) {
    if (!isCurtainAnimation && url === window.location.href) {
      isCurtainAnimation = true;
      triggerCurtainAnimation(() => {
        originalLocationReplace.call(window.location, url);
      });
      return;
    }
    originalLocationReplace.call(window.location, url);
  };
  
  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // F5, Ctrl+R, Cmd+R, Ctrl+F5, Cmd+Shift+R
    const isReloadShortcut = 
      e.key === 'F5' || 
      (e.key === 'r' && (e.ctrlKey || e.metaKey)) ||
      (e.key === 'R' && (e.ctrlKey || e.metaKey));
    
    if (isReloadShortcut && !isCurtainAnimation) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      isCurtainAnimation = true;
      const isHardRefresh = (e.ctrlKey && e.shiftKey) || (e.metaKey && e.shiftKey);
      
      triggerCurtainAnimation(() => {
        if (isHardRefresh) {
          // Force reload from server
          window.location.href = window.location.href + (window.location.href.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();
        } else {
          window.location.reload();
        }
      });
    }
  }, true);
  
  // Try to detect browser UI reload (imperfect)
  window.addEventListener('beforeunload', function(e) {
    // Don't show default browser prompt
    e.preventDefault();
    e.returnValue = '';
    
    if (!isCurtainAnimation) {
      isCurtainAnimation = true;
      // Quick curtain close (no pause since browser will reload immediately)
      document.querySelector('.curtain-container')?.classList.add('curtain-closing');
    }
  });
  
  function triggerCurtainAnimation(callback) {
    // Find curtain container and trigger closing
    const curtainContainer = document.querySelector('.curtain-container');
    if (curtainContainer) {
      curtainContainer.classList.remove('curtain-opening', 'curtain-closed');
      curtainContainer.classList.add('curtain-closing');
      
      // Block interactions
      document.body.style.pointerEvents = 'none';
      document.body.style.cursor = 'wait';
      
      // Execute callback after short delay
      setTimeout(() => {
        if (callback) callback();
      }, 800);
    } else {
      // No curtains found, just execute callback
      if (callback) setTimeout(callback, 100);
    }
  }
  
  // Reset flag when page loads
  window.addEventListener('load', function() {
    isCurtainAnimation = false;
  });
})();