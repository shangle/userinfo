export interface BrowserInfo {
  name: string;
  version: string;
}

export interface NetworkInfo {
  ip: string;
  isp: string;
  city: string;
  region: string;
  country: string;
}

export const getBrowserInfo = (): BrowserInfo => {
  const ua = navigator.userAgent || '';
  let name = 'Unknown Browser';
  let version = 'Unknown';

  const rules = [
    { name: 'Microsoft Edge', regex: /Edg\/([\d\.]+)/ },
    { name: 'Opera', regex: /OPR\/([\d\.]+)/ },
    { name: 'Samsung Internet', regex: /SamsungBrowser\/([\d\.]+)/ },
    { name: 'Firefox', regex: /Firefox\/([\d\.]+)/ },
    { name: 'Chrome', regex: /Chrome\/([\d\.]+)/ },
    { name: 'Safari', regex: /Version\/([\d\.]+).*Safari/ },
    { name: 'Internet Explorer', regex: /MSIE\s([\d\.]+)/ },
    { name: 'Internet Explorer', regex: /Trident\/.*rv:([\d\.]+)/ }
  ];

  for (const rule of rules) {
    const match = ua.match(rule.regex);
    if (match) {
      name = rule.name;
      version = match[1];
      break;
    }
  }

  return { name, version };
};

export const getNetworkInfo = async (): Promise<NetworkInfo> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      ip: data.ip || 'Unknown',
      isp: data.org || 'Unknown',
      city: data.city || 'Unknown',
      region: data.region || 'Unknown',
      country: data.country_name || 'Unknown',
    };
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return {
      ip: 'Unknown (Blocked or Offline)',
      isp: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
    };
  }
};

export const getOSInfo = (): string => {
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';

  if (/Android\s([\d\.]+)/.test(ua)) {
    const m = ua.match(/Android\s([\d\.]+)/);
    return 'Android ' + (m ? m[1] : '');
  }
  if (/iPhone/.test(ua)) return 'iPhone (iOS)';
  if (/iPad/.test(ua)) return 'iPad (iPadOS)';
  if (/CrOS/.test(ua)) return 'Chrome OS';

  if (/Windows NT 10\.0/.test(ua)) return 'Windows 10 or 11';
  if (/Windows NT 6\.3/.test(ua)) return 'Windows 8.1';
  if (/Windows NT 6\.2/.test(ua)) return 'Windows 8';
  if (/Windows NT 6\.1/.test(ua)) return 'Windows 7';
  if (/Windows/i.test(ua)) return 'Windows';

  if (/Mac OS X 10[_.]15/.test(ua)) return 'macOS Catalina';
  if (/Mac OS X 11[_.]/.test(ua)) return 'macOS Big Sur';
  if (/Mac OS X 12[_.]/.test(ua)) return 'macOS Monterey';
  if (/Mac OS X 13[_.]/.test(ua)) return 'macOS Ventura';
  if (/Mac OS X 14[_.]/.test(ua)) return 'macOS Sonoma';
  if (/Mac OS X/.test(ua) || /Mac/.test(platform)) return 'macOS';

  if (/Linux/.test(ua)) return 'Linux';
  return 'Unknown Operating System';
};

export const getDeviceType = (): string => {
  const ua = navigator.userAgent || '';
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return 'Tablet';
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return 'Phone';
  return 'Desktop or Laptop';
};

export const cookiesEnabledStatus = (): string => {
  try { return navigator.cookieEnabled ? 'Yes' : 'No'; } catch (e) { return 'Unknown'; }
};

export const touchSupport = (): string => {
  try { return ('ontouchstart' in window || navigator.maxTouchPoints > 0) ? 'Yes' : 'No'; } catch (e) { return 'Unknown'; }
};

export const localStorageStatus = (): string => {
  try {
    const key = '__choiceone_test__';
    localStorage.setItem(key, '1');
    localStorage.removeItem(key);
    return 'Available';
  } catch (e) {
    return 'Blocked or unavailable';
  }
};

export const sessionStorageStatus = (): string => {
  try {
    const key = '__choiceone_test__';
    sessionStorage.setItem(key, '1');
    sessionStorage.removeItem(key);
    return 'Available';
  } catch (e) {
    return 'Blocked or unavailable';
  }
};

export const doNotTrackStatus = (): string => {
  const dnt = navigator.doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack;
  if (dnt === '1' || dnt === 'yes') return 'On';
  if (dnt === '0' || dnt === 'no') return 'Off';
  return 'Not reported';
};

export const colorSchemePreference = (): string => {
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'Dark mode preferred';
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'Light mode preferred';
    return 'No preference reported';
  } catch (e) {
    return 'Not available';
  }
};

export const reducedMotionPreference = (): string => {
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'Reduce motion is on';
    return 'Reduce motion is off';
  } catch (e) {
    return 'Not available';
  }
};

export const formatLanguages = (): string => {
  if (navigator.languages && navigator.languages.length) return navigator.languages.join(', ');
  return navigator.language || 'Not available';
};

export const parseMajorVersion = (versionString: string): number | null => {
  const m = String(versionString || '').match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : null;
};

export const getOutdatedWarning = (browserName: string, majorVersion: number | null, osName: string): string => {
  if (!browserName || majorVersion === null) return '';
  if (browserName === 'Internet Explorer') return 'This browser is too old for modern online banking and should not be used.';
  if (browserName === 'Chrome' && majorVersion < 120) return 'Your Chrome browser may be out of date. A newer version is recommended for security and compatibility.';
  if (browserName === 'Microsoft Edge' && majorVersion < 120) return 'Your Edge browser may be out of date. A newer version is recommended for security and compatibility.';
  if (browserName === 'Firefox' && majorVersion < 115) return 'Your Firefox browser may be out of date. A newer version is recommended for security and compatibility.';
  if (browserName === 'Safari' && /macOS|iPhone|iPad/.test(osName) && majorVersion < 16) return 'Your Safari browser may be out of date. A newer version is recommended for security and compatibility.';
  if (browserName === 'Opera' && majorVersion < 105) return 'Your Opera browser may be out of date. A newer version is recommended for security and compatibility.';
  if (browserName === 'Samsung Internet' && majorVersion < 20) return 'Your Samsung Internet browser may be out of date. A newer version is recommended for security and compatibility.';
  return '';
};

export const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export interface WebRTCInfo {
  supported: boolean;
  stunStatus: string;
  localIps: string[];
  publicIps: string[];
}

export interface GPUInfo {
  vendor: string;
  renderer: string;
  isHardwareAccelerated: boolean;
}

export interface NetworkProtocolInfo {
  protocol: string;
  isHttp3: boolean;
  isQuic: boolean;
  h3Support: string;
  tlsVersion?: string;
  cipherSuite?: string;
}

export interface SSLInfo {
  tlsVersion: string;
  cipherSuite: string;
  rating: string;
}

export const getSSLInfo = async (): Promise<SSLInfo> => {
  try {
    const response = await fetch('https://www.howsmyssl.com/a/check');
    const data = await response.json();
    return {
      tlsVersion: data.tls_version || 'Unknown',
      cipherSuite: data.given_cipher_suites?.[0] || 'Unknown',
      rating: data.rating || 'Unknown'
    };
  } catch (error) {
    console.error('Error fetching SSL info:', error);
    return {
      tlsVersion: 'Unavailable',
      cipherSuite: 'Unavailable',
      rating: 'Unknown'
    };
  }
};

export interface ExtensionConflictInfo {
  detected: boolean;
  conflicts: string[];
}

export interface MemoryInfo {
  jsHeapSizeLimit: number | null;
  totalJSHeapSize: number | null;
  usedJSHeapSize: number | null;
  deviceMemory: number | null;
}

export interface ThreadingInfo {
  webWorkersSupported: boolean;
  sharedArrayBufferSupported: boolean;
  crossOriginIsolated: boolean;
  hardwareConcurrency: number;
}

export const getMemoryInfo = (): MemoryInfo => {
  const mem = (performance as any).memory;
  return {
    jsHeapSizeLimit: mem ? mem.jsHeapSizeLimit : null,
    totalJSHeapSize: mem ? mem.totalJSHeapSize : null,
    usedJSHeapSize: mem ? mem.usedJSHeapSize : null,
    deviceMemory: (navigator as any).deviceMemory || null,
  };
};

export const getThreadingInfo = (): ThreadingInfo => {
  return {
    webWorkersSupported: typeof Worker !== 'undefined',
    sharedArrayBufferSupported: typeof SharedArrayBuffer !== 'undefined',
    crossOriginIsolated: (window as any).crossOriginIsolated || false,
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
  };
};

export const detectExtensionConflicts = (): ExtensionConflictInfo => {
  const conflicts: string[] = [];

  // 1. Check for common attributes on document element or body
  const docAttrs = document.documentElement.attributes;
  const bodyAttrs = document.body?.attributes || [];

  const checkAttrs = (attrs: NamedNodeMap | Attr[]) => {
    for (let i = 0; i < attrs.length; i++) {
      const name = attrs[i].name.toLowerCase();
      if (name.includes('grammarly')) conflicts.push('Grammarly');
      if (name.includes('darkreader')) conflicts.push('Dark Reader');
      if (name.includes('lastpass')) conflicts.push('LastPass');
      if (name.includes('bitwarden')) conflicts.push('Bitwarden');
      if (name.includes('honey')) conflicts.push('Honey');
      if (name.includes('ghostery')) conflicts.push('Ghostery');
      if (name.includes('adblock')) conflicts.push('AdBlocker');
    }
  };

  checkAttrs(Array.from(docAttrs));
  checkAttrs(Array.from(bodyAttrs));

  // 2. Check for global variables
  const win = window as any;
  if (win.grammarly || win.Grammarly) conflicts.push('Grammarly');
  if (win.__darkreader) conflicts.push('Dark Reader');
  if (win.lpInjected || win.LpInjected) conflicts.push('LastPass');
  if (win.bitwarden || win.Bitwarden) conflicts.push('Bitwarden');
  if (win.honey || win.Honey) conflicts.push('Honey');
  if (win.__REACT_DEVTOOLS_GLOBAL_HOOK__) conflicts.push('React Developer Tools');
  if (win.__REDUX_DEVTOOLS_EXTENSION__) conflicts.push('Redux DevTools');
  if (win._ghostery) conflicts.push('Ghostery');

  // 3. Check for injected elements
  if (document.querySelector('grammarly-desktop-integration')) conflicts.push('Grammarly');
  if (document.querySelector('[id*="lastpass"]')) conflicts.push('LastPass');
  if (document.querySelector('[class*="bitwarden"]')) conflicts.push('Bitwarden');
  if (document.querySelector('style[id*="dark-reader"]')) conflicts.push('Dark Reader');

  // Remove duplicates
  const uniqueConflicts = Array.from(new Set(conflicts));

  return {
    detected: uniqueConflicts.length > 0,
    conflicts: uniqueConflicts
  };
};

export const getNetworkProtocolInfo = (): NetworkProtocolInfo => {
  try {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const protocol = navigationEntry?.nextHopProtocol || 'unknown';
    
    // Check if the protocol is HTTP/3 or QUIC
    const isHttp3 = protocol.includes('h3') || protocol.includes('http/3');
    const isQuic = protocol.includes('quic');

    // Also check other resources to see if any are using h3
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const hasH3Resource = resources.some(r => r.nextHopProtocol.includes('h3') || r.nextHopProtocol.includes('http/3'));

    let h3Support = 'Not Detected';
    if (isHttp3 || hasH3Resource) {
      h3Support = 'Supported & Active';
    } else if ((window as any).chrome || /Firefox/.test(navigator.userAgent)) {
      // Modern browsers generally support H3 even if it's not active for this specific origin
      h3Support = 'Browser Supports (Not Active)';
    }

    return {
      protocol,
      isHttp3: isHttp3 || hasH3Resource,
      isQuic: isQuic || protocol.includes('quic'),
      h3Support
    };
  } catch (e) {
    return {
      protocol: 'Error detecting',
      isHttp3: false,
      isQuic: false,
      h3Support: 'Unknown'
    };
  }
};

export const getGPUInfo = (): GPUInfo => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    
    if (!gl) {
      return {
        vendor: 'Not available',
        renderer: 'Not available',
        isHardwareAccelerated: false
      };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : (gl.getParameter(gl.VENDOR) || 'Unknown');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : (gl.getParameter(gl.RENDERER) || 'Unknown');
    
    // Software renderers typically contain these strings
    const softwareKeywords = ['swiftshader', 'software', 'mesa', 'llvmpipe', 'gallium', 'google-rendering-engine'];
    const lowerRenderer = renderer.toLowerCase();
    const isSoftware = softwareKeywords.some(s => lowerRenderer.includes(s));
    
    return {
      vendor,
      renderer,
      isHardwareAccelerated: !isSoftware
    };
  } catch (e) {
    return {
      vendor: 'Error detecting',
      renderer: 'Error detecting',
      isHardwareAccelerated: false
    };
  }
};

export interface MediaCapabilitiesInfo {
  widevine: boolean;
  playready: boolean;
  fairplay: boolean;
  hdcpStatus: string;
  decodingInfo: {
    supported: boolean;
    smooth: boolean;
    powerEfficient: boolean;
  };
}

export const getMediaCapabilitiesInfo = async (): Promise<MediaCapabilitiesInfo> => {
  const checkDRM = async (keySystem: string): Promise<boolean> => {
    try {
      if (!navigator.requestMediaKeySystemAccess) return false;
      const config = [{
        initDataTypes: ['cenc'],
        videoCapabilities: [{ contentType: 'video/mp4; codecs="avc1.42E01E"' }],
        audioCapabilities: [{ contentType: 'audio/mp4; codecs="mp4a.40.2"' }]
      }];
      await navigator.requestMediaKeySystemAccess(keySystem, config);
      return true;
    } catch (e) {
      return false;
    }
  };

  const widevine = await checkDRM('com.widevine.alpha');
  const playready = await checkDRM('com.microsoft.playready');
  const fairplay = await checkDRM('com.apple.fps.1_0');

  let hdcpStatus = 'Unknown';
  if (widevine) {
    try {
      const config = [{
        initDataTypes: ['cenc'],
        videoCapabilities: [{ contentType: 'video/mp4; codecs="avc1.42E01E"' }],
      }];
      const access = await navigator.requestMediaKeySystemAccess('com.widevine.alpha', config);
      const keys = await access.createMediaKeys();
      if ((keys as any).getStatusForPolicy) {
        const status = await (keys as any).getStatusForPolicy({ minHdcpVersion: '1.0' });
        hdcpStatus = status;
      } else {
        hdcpStatus = 'Not supported by browser';
      }
    } catch (e) {
      hdcpStatus = 'Error checking';
    }
  }

  let decodingInfo = { supported: false, smooth: false, powerEfficient: false };
  if ('mediaCapabilities' in navigator) {
    try {
      const result = await navigator.mediaCapabilities.decodingInfo({
        type: 'media-source',
        video: {
          contentType: 'video/mp4; codecs="avc1.42E01E"',
          width: 1920,
          height: 1080,
          bitrate: 5000000,
          framerate: 60
        }
      });
      decodingInfo = {
        supported: result.supported,
        smooth: result.smooth,
        powerEfficient: result.powerEfficient
      };
    } catch (e) {}
  }

  return { widevine, playready, fairplay, hdcpStatus, decodingInfo };
};

export const getWebRTCInfo = async (): Promise<WebRTCInfo> => {
  const info: WebRTCInfo = {
    supported: 'RTCPeerConnection' in window,
    stunStatus: 'Not tested',
    localIps: [],
    publicIps: [],
  };

  if (!info.supported) return info;

  try {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    const ips = new Set<string>();
    
    pc.onicecandidate = (event) => {
      if (!event.candidate) {
        info.stunStatus = 'ICE Gathering Complete';
        return;
      }
      
      const parts = event.candidate.candidate.split(' ');
      const ip = parts[4];
      if (ip && !ips.has(ip)) {
        ips.add(ip);
        if (ip.includes('.local') || ip.match(/^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.)/)) {
          info.localIps.push(ip);
        } else {
          info.publicIps.push(ip);
        }
      }
    };

    pc.createDataChannel('test');
    await pc.createOffer().then(offer => pc.setLocalDescription(offer));
    
    info.stunStatus = 'Gathering...';

    // Wait for gathering to complete or timeout
    await new Promise<void>((resolve) => {
      let timeout = setTimeout(() => {
        if (info.stunStatus === 'Gathering...') info.stunStatus = 'Timed out';
        resolve();
      }, 5000);
      
      pc.onicegatheringstatechange = () => {
        if (pc.iceGatheringState === 'complete') {
          clearTimeout(timeout);
          info.stunStatus = 'Success';
          resolve();
        }
      };
    });

    pc.close();
  } catch (error) {
    info.stunStatus = 'Error: ' + (error instanceof Error ? error.message : String(error));
  }

  return info;
};

export interface FontInfo {
  available: string[];
  missing: string[];
  rendering: {
    pixelRatio: number;
    fontSmoothing: string;
    textRendering: string;
  };
}

export const detectFonts = (): FontInfo => {
  const criticalFonts = [
    'Arial',
    'Verdana',
    'Times New Roman',
    'Georgia',
    'Courier New',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Inter',
    'Open Sans',
    'Tahoma',
    'Trebuchet MS',
    'Impact',
    'Comic Sans MS'
  ];

  const available: string[] = [];
  const missing: string[] = [];

  // Create a hidden container for font detection
  const container = document.createElement('span');
  container.style.visibility = 'hidden';
  container.style.position = 'absolute';
  container.style.top = '-9999px';
  container.style.fontSize = '72px';
  container.innerHTML = 'abcdefghijklmnopqrstuvwxyz0123456789';
  document.body.appendChild(container);

  const checkFont = (fontName: string) => {
    // Compare width against generic fallbacks
    const fallbacks = ['monospace', 'sans-serif', 'serif'];
    let isDifferent = false;

    for (const fallback of fallbacks) {
      container.style.fontFamily = fallback;
      const fallbackWidth = container.offsetWidth;

      container.style.fontFamily = `"${fontName}", ${fallback}`;
      const fontWidth = container.offsetWidth;

      if (fontWidth !== fallbackWidth) {
        isDifferent = true;
        break;
      }
    }

    // Some fonts might have the same width as fallback for some characters, 
    // but usually 72px and long string is enough to see difference.
    // Also check if the font is actually loaded if we can.
    if (isDifferent || (document as any).fonts?.check?.(`12px "${fontName}"`)) {
      available.push(fontName);
    } else {
      missing.push(fontName);
    }
  };

  criticalFonts.forEach(checkFont);
  document.body.removeChild(container);

  // Detect rendering characteristics
  const rendering = {
    pixelRatio: window.devicePixelRatio || 1,
    fontSmoothing: 'Unknown',
    textRendering: 'auto'
  };

  // Check for font-smoothing support and active state (best effort)
  if (window.getComputedStyle) {
    const style = window.getComputedStyle(document.body);
    rendering.fontSmoothing = (style as any).webkitFontSmoothing || (style as any).mozOsxFontSmoothing || 'default';
    rendering.textRendering = style.textRendering || 'auto';
  }

  return { available, missing, rendering };
};

export interface PeripheralInfo {
  gamepads: {
    id: string;
    index: number;
    mapping: string;
    buttons: number;
    axes: number;
  }[];
  midi: {
    supported: boolean;
    inputs: { name: string; manufacturer: string; state: string }[];
    outputs: { name: string; manufacturer: string; state: string }[];
  };
}

export const getPeripheralInfo = async (): Promise<PeripheralInfo> => {
  const info: PeripheralInfo = {
    gamepads: [],
    midi: {
      supported: 'requestMIDIAccess' in navigator,
      inputs: [],
      outputs: []
    }
  };

  // Detect Gamepads
  try {
    if (navigator.getGamepads) {
      const gamepads = navigator.getGamepads();
      for (const gp of gamepads) {
        if (gp) {
          info.gamepads.push({
            id: gp.id,
            index: gp.index,
            mapping: gp.mapping,
            buttons: gp.buttons.length,
            axes: gp.axes.length
          });
        }
      }
    }
  } catch (e) {
    console.error('Error detecting gamepads:', e);
  }

  // Detect MIDI
  if (info.midi.supported) {
    try {
      const midiAccess = await navigator.requestMIDIAccess({ sysex: false });
      midiAccess.inputs.forEach((input: any) => {
        info.midi.inputs.push({
          name: input.name || 'Unknown',
          manufacturer: input.manufacturer || 'Unknown',
          state: input.state || 'Unknown'
        });
      });
      midiAccess.outputs.forEach((output: any) => {
        info.midi.outputs.push({
          name: output.name || 'Unknown',
          manufacturer: output.manufacturer || 'Unknown',
          state: output.state || 'Unknown'
        });
      });
    } catch (e) {
      console.error('Error detecting MIDI devices:', e);
    }
  }

  return info;
};
