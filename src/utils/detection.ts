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
  if (/Android\s([\d\.]+)/.test(ua)) {
    const m = ua.match(/Android\s([\d\.]+)/);
    return 'Android ' + (m ? m[1] : '');
  }
  if (/iPhone/.test(ua)) return 'iPhone (iOS)';
  if (/iPad/.test(ua)) return 'iPad (iPadOS)';
  if (/Linux/.test(ua)) return 'Linux';
  if (/CrOS/.test(ua)) return 'Chrome OS';
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
