const fs = require('fs');
const path = require('path');
const glob = require('glob');

// This script injects the dashboard console capture script into the built HTML files
// It is intended to run as a postbuild script

const BUILD_DIR = path.join(process.cwd(), '.next');
// For static exports, this might be 'out' instead
const PUBLIC_DIR = path.join(process.cwd(), 'public');

console.log('Injecting console capture script...');

// Ensure the capture script exists in public dir
const captureScriptContent = `
(function() {
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, (key, value) => {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          });
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');
    
    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };
    
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {}
  }

  ['log', 'warn', 'error', 'info', 'debug'].forEach(level => {
    console[level] = function(...args) {
      captureLog(level, args);
      originalConsole[level].apply(console, args);
    };
  });

  window.addEventListener('error', function(event) {
    captureLog('error', [event.error?.stack || event.message]);
  });

  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', ['Unhandled Promise Rejection:', event.reason]);
  });

  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }
  
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {}
  }

  if (document.readyState === 'complete') {
    sendReady();
    sendRouteChange();
  } else {
    window.addEventListener('load', () => {
      sendReady();
      sendRouteChange();
    });
  }
  
  // Track history changes for SPAs
  const originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(this, arguments);
    sendRouteChange();
  };
  
  const originalReplaceState = history.replaceState;
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    sendRouteChange();
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
})();
`;

try {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(PUBLIC_DIR, 'dashboard-console-capture.js'), captureScriptContent);
  console.log('✅ Created dashboard-console-capture.js in public directory');
} catch (error) {
  console.error('❌ Failed to create capture script:', error);
}
`;