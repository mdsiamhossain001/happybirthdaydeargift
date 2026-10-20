// ============================================================
// DEVTOOLS DETECTOR - Safe version (doesn't break page)
// ============================================================
(function () {
  'use strict';

  // Simple detector: log warning only, không block
  let devtoolsOpen = false;
  const threshold = 160;

  function checkDevTools() {
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;

    if ((widthDiff || heightDiff) && !devtoolsOpen) {
      devtoolsOpen = true;
      console.warn('🔍 DevTools detected. Please close it if you see rendering issues.');
    } else if (!widthDiff && !heightDiff && devtoolsOpen) {
      devtoolsOpen = false;
    }
  }

  setInterval(checkDevTools, 1000);

  // Expose global (compatibility with old code)
  window.DisableDevtool = function (opts) {
    console.log('[detect-devtools] Loaded (safe mode)');
  };
})();
