import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getBrowserInfo,
  getOSInfo,
  getDeviceType,
  cookiesEnabledStatus,
  localStorageStatus,
  sessionStorageStatus,
  touchSupport,
  doNotTrackStatus,
  colorSchemePreference,
  reducedMotionPreference,
  formatLanguages,
  parseMajorVersion,
  getOutdatedWarning,
  isValidEmail,
  getNetworkInfo,
  getWebRTCInfo,
  getGPUInfo,
  getNetworkProtocolInfo,
  getMemoryInfo,
  getThreadingInfo,
  detectExtensionConflicts,
  getBatteryInfo
} from './detection';

describe('detection utils', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      userAgent: '',
      platform: '',
      cookieEnabled: true,
      languages: ['en-US', 'en'],
      language: 'en-US',
      doNotTrack: null,
      maxTouchPoints: 0,
    });
    // Do not overwrite window completely
    (window as any).matchMedia = vi.fn().mockReturnValue({ 
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn()
    });
    vi.stubGlobal('localStorage', {
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
    vi.stubGlobal('sessionStorage', {
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getBrowserInfo', () => {
    it('detects Chrome', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });
      expect(getBrowserInfo()).toEqual({ name: 'Chrome', version: '120.0.0.0' });
    });

    it('detects Firefox', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0' });
      expect(getBrowserInfo()).toEqual({ name: 'Firefox', version: '115.0' });
    });

    it('detects Safari', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15' });
      expect(getBrowserInfo()).toEqual({ name: 'Safari', version: '16.0' });
    });

    it('detects Microsoft Edge', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.2210.133' });
      expect(getBrowserInfo()).toEqual({ name: 'Microsoft Edge', version: '120.0.2210.133' });
    });

    it('detects Opera', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/105.0.0.0' });
      expect(getBrowserInfo()).toEqual({ name: 'Opera', version: '105.0.0.0' });
    });

    it('detects Samsung Internet', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/22.0 Chrome/111.0.5563.116 Mobile Safari/537.36' });
      expect(getBrowserInfo()).toEqual({ name: 'Samsung Internet', version: '22.0' });
    });

    it('detects Internet Explorer (legacy)', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko' });
      expect(getBrowserInfo()).toEqual({ name: 'Internet Explorer', version: '11.0' });
    });

    it('returns unknown for unknown UA', () => {
      vi.stubGlobal('navigator', { userAgent: 'Unknown' });
      expect(getBrowserInfo()).toEqual({ name: 'Unknown Browser', version: 'Unknown' });
    });
  });

  describe('getOSInfo', () => {
    it('detects Windows 10/11', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' });
      expect(getOSInfo()).toBe('Windows 10 or 11');
    });

    it('detects Windows 8.1', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Windows NT 6.3; Win64; x64)' });
      expect(getOSInfo()).toBe('Windows 8.1');
    });

    it('detects macOS Sonoma', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)', platform: 'MacIntel' });
      expect(getOSInfo()).toBe('macOS Sonoma');
    });

    it('detects macOS Big Sur', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0)', platform: 'MacIntel' });
      expect(getOSInfo()).toBe('macOS Big Sur');
    });

    it('detects Linux', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (X11; Linux x86_64)' });
      expect(getOSInfo()).toBe('Linux');
    });

    it('detects Android', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 6)' });
      expect(getOSInfo()).toBe('Android 13');
    });

    it('detects iPhone', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)' });
      expect(getOSInfo()).toBe('iPhone (iOS)');
    });

    it('detects Chrome OS', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0)' });
      expect(getOSInfo()).toBe('Chrome OS');
    });
  });

  describe('getDeviceType', () => {
    it('detects Mobile', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1' });
      expect(getDeviceType()).toBe('Phone');
    });

    it('detects Tablet', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1' });
      expect(getDeviceType()).toBe('Tablet');
    });

    it('detects Desktop', () => {
      vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36' });
      expect(getDeviceType()).toBe('Desktop or Laptop');
    });
  });

  describe('cookiesEnabledStatus', () => {
    it('returns Yes when enabled', () => {
      vi.stubGlobal('navigator', { cookieEnabled: true });
      expect(cookiesEnabledStatus()).toBe('Yes');
    });

    it('returns No when disabled', () => {
      vi.stubGlobal('navigator', { cookieEnabled: false });
      expect(cookiesEnabledStatus()).toBe('No');
    });
  });

  describe('localStorageStatus', () => {
    it('returns Available when working', () => {
      expect(localStorageStatus()).toBe('Available');
    });

    it('returns Blocked when throwing error', () => {
      vi.stubGlobal('localStorage', {
        setItem: () => { throw new Error(); }
      });
      expect(localStorageStatus()).toBe('Blocked or unavailable');
    });
  });

  describe('sessionStorageStatus', () => {
    it('returns Available when working', () => {
      expect(sessionStorageStatus()).toBe('Available');
    });

    it('returns Blocked when throwing error', () => {
      vi.stubGlobal('sessionStorage', {
        setItem: () => { throw new Error(); }
      });
      expect(sessionStorageStatus()).toBe('Blocked or unavailable');
    });
  });

  describe('touchSupport', () => {
    it('returns Yes if ontouchstart exists', () => {
      vi.stubGlobal('window', { ontouchstart: null });
      expect(touchSupport()).toBe('Yes');
    });

    it('returns Yes if maxTouchPoints > 0', () => {
      vi.stubGlobal('navigator', { maxTouchPoints: 1 });
      expect(touchSupport()).toBe('Yes');
    });

    it('returns No otherwise', () => {
      vi.stubGlobal('navigator', { maxTouchPoints: 0 });
      if ('ontouchstart' in window) delete (window as any).ontouchstart;
      expect(touchSupport()).toBe('No');
    });
  });

  describe('doNotTrackStatus', () => {
    it('returns On for "1"', () => {
      vi.stubGlobal('navigator', { doNotTrack: '1' });
      expect(doNotTrackStatus()).toBe('On');
    });

    it('returns Off for "0"', () => {
      vi.stubGlobal('navigator', { doNotTrack: '0' });
      expect(doNotTrackStatus()).toBe('Off');
    });

    it('returns Not reported for null', () => {
      vi.stubGlobal('navigator', { doNotTrack: null });
      expect(doNotTrackStatus()).toBe('Not reported');
    });
  });

  describe('colorSchemePreference', () => {
    it('detects Dark mode', () => {
      vi.stubGlobal('window', {
        matchMedia: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          addListener: vi.fn(),
          removeListener: vi.fn(),
        })),
      });
      expect(colorSchemePreference()).toBe('Dark mode preferred');
    });

    it('detects Light mode', () => {
      vi.stubGlobal('window', {
        matchMedia: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: light)',
          addListener: vi.fn(),
          removeListener: vi.fn(),
        })),
      });
      expect(colorSchemePreference()).toBe('Light mode preferred');
    });
  });

  describe('reducedMotionPreference', () => {
    it('detects Reduce motion ON', () => {
      vi.stubGlobal('window', {
        matchMedia: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          addListener: vi.fn(),
          removeListener: vi.fn(),
        })),
      });
      expect(reducedMotionPreference()).toBe('Reduce motion is on');
    });

    it('detects Reduce motion OFF', () => {
      vi.stubGlobal('window', {
        matchMedia: vi.fn().mockImplementation(() => ({
          matches: false,
          addListener: vi.fn(),
          removeListener: vi.fn(),
        })),
      });
      expect(reducedMotionPreference()).toBe('Reduce motion is off');
    });
  });

  describe('formatLanguages', () => {
    it('formats multiple languages', () => {
      vi.stubGlobal('navigator', { languages: ['en-US', 'fr-FR'] });
      expect(formatLanguages()).toBe('en-US, fr-FR');
    });

    it('falls back to single language', () => {
      vi.stubGlobal('navigator', { languages: [], language: 'en-US' });
      expect(formatLanguages()).toBe('en-US');
    });
  });

  describe('parseMajorVersion', () => {
    it('parses version correctly', () => {
      expect(parseMajorVersion('120.0.0.1')).toBe(120);
      expect(parseMajorVersion('115')).toBe(115);
      expect(parseMajorVersion('')).toBeNull();
      expect(parseMajorVersion('abc')).toBeNull();
    });
  });

  describe('getOutdatedWarning', () => {
    it('warns for old Chrome', () => {
      expect(getOutdatedWarning('Chrome', 110, 'Windows')).toContain('out of date');
    });

    it('no warning for new Chrome', () => {
      expect(getOutdatedWarning('Chrome', 121, 'Windows')).toBe('');
    });

    it('warns for IE', () => {
      expect(getOutdatedWarning('Internet Explorer', 11, 'Windows')).toContain('too old');
    });

    it('warns for old Safari on macOS', () => {
      expect(getOutdatedWarning('Safari', 15, 'macOS Sonoma')).toContain('out of date');
    });
  });

  describe('isValidEmail', () => {
    it('validates correct emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('invalidates incorrect emails', () => {
      expect(isValidEmail('test@example')).toBe(false);
      expect(isValidEmail('test@.com')).toBe(false);
      expect(isValidEmail('test')).toBe(false);
    });
  });

  describe('getNetworkInfo', () => {
    it('fetches network info successfully', async () => {
      const mockData = {
        ip: '1.2.3.4',
        org: 'Test ISP',
        city: 'Test City',
        region: 'Test Region',
        country_name: 'Test Country'
      };
      
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockData)
      }));

      const info = await getNetworkInfo();
      expect(info).toEqual({
        ip: '1.2.3.4',
        isp: 'Test ISP',
        city: 'Test City',
        region: 'Test Region',
        country: 'Test Country'
      });
    });

    it('handles fetch error', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
      
      const info = await getNetworkInfo();
      expect(info.ip).toContain('Unknown');
    });
  });

  describe('getWebRTCInfo', () => {
    it('returns supported false if RTCPeerConnection is missing', async () => {
      vi.stubGlobal('window', {});
      const info = await getWebRTCInfo();
      expect(info.supported).toBe(false);
    });
  });

  describe('getGPUInfo', () => {
    it('returns information when WebGL is available', () => {
      const mockGetExtension = vi.fn().mockReturnValue({
        UNMASKED_VENDOR_WEBGL: 0x9245,
        UNMASKED_RENDERER_WEBGL: 0x9246,
      });
      const mockGetParameter = vi.fn().mockImplementation((param) => {
        if (param === 0x9245) return 'NVIDIA';
        if (param === 0x9246) return 'GeForce RTX 3080';
        return 'Unknown';
      });

      const mockContext = {
        getExtension: mockGetExtension,
        getParameter: mockGetParameter,
      };

      vi.stubGlobal('document', {
        createElement: vi.fn().mockReturnValue({
          getContext: vi.fn().mockReturnValue(mockContext),
        }),
      });

      const info = getGPUInfo();
      expect(info.vendor).toBe('NVIDIA');
      expect(info.renderer).toBe('GeForce RTX 3080');
      expect(info.isHardwareAccelerated).toBe(true);
    });

    it('detects software rendering', () => {
      const mockGetExtension = vi.fn().mockReturnValue({
        UNMASKED_VENDOR_WEBGL: 1,
        UNMASKED_RENDERER_WEBGL: 2,
      });
      const mockGetParameter = vi.fn().mockImplementation((param) => {
        if (param === 1) return 'Google';
        if (param === 2) return 'Google SwiftShader';
        return 'Unknown';
      });

      const mockContext = {
        getExtension: mockGetExtension,
        getParameter: mockGetParameter,
      };

      vi.stubGlobal('document', {
        createElement: vi.fn().mockReturnValue({
          getContext: vi.fn().mockReturnValue(mockContext),
        }),
      });

      const info = getGPUInfo();
      expect(info.isHardwareAccelerated).toBe(false);
    });

    it('handles WebGL unavailability', () => {
      vi.stubGlobal('document', {
        createElement: vi.fn().mockReturnValue({
          getContext: vi.fn().mockReturnValue(null),
        }),
      });

      const info = getGPUInfo();
      expect(info.vendor).toBe('Not available');
      expect(info.isHardwareAccelerated).toBe(false);
    });
  });

  describe('getNetworkProtocolInfo', () => {
    it('detects H3 from performance entries', () => {
      const mockNavigationEntry = {
        nextHopProtocol: 'h3',
      };
      const mockResourceEntries = [
        { nextHopProtocol: 'h2' },
        { nextHopProtocol: 'h3' },
      ];

      vi.stubGlobal('performance', {
        getEntriesByType: (type: string) => {
          if (type === 'navigation') return [mockNavigationEntry];
          if (type === 'resource') return mockResourceEntries;
          return [];
        },
      });

      const info = getNetworkProtocolInfo();
      expect(info.protocol).toBe('h3');
      expect(info.isHttp3).toBe(true);
      expect(info.h3Support).toBe('Supported & Active');
    });

    it('detects browser support when not active', () => {
      vi.stubGlobal('performance', {
        getEntriesByType: () => [],
      });
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      });
      (window as any).chrome = {};

      const info = getNetworkProtocolInfo();
      expect(info.isHttp3).toBe(false);
      expect(info.h3Support).toBe('Browser Supports (Not Active)');
    });

    it('handles errors gracefully', () => {
      vi.stubGlobal('performance', {
        getEntriesByType: () => { throw new Error(); },
      });

      const info = getNetworkProtocolInfo();
      expect(info.protocol).toBe('Error detecting');
      expect(info.h3Support).toBe('Unknown');
    });
  });

  describe('detectExtensionConflicts', () => {
    it('detects Grammarly from attributes', () => {
      vi.stubGlobal('document', {
        documentElement: { attributes: [{ name: 'data-grammarly-part', value: 'test' }] },
        body: { attributes: [] },
        querySelector: vi.fn().mockReturnValue(null),
      });
      const info = detectExtensionConflicts();
      expect(info.detected).toBe(true);
      expect(info.conflicts).toContain('Grammarly');
    });

    it('detects Dark Reader from global variables', () => {
      vi.stubGlobal('document', {
        documentElement: { attributes: [] },
        body: { attributes: [] },
        querySelector: vi.fn().mockReturnValue(null),
      });
      (window as any).__darkreader = {};
      const info = detectExtensionConflicts();
      expect(info.detected).toBe(true);
      expect(info.conflicts).toContain('Dark Reader');
      delete (window as any).__darkreader;
    });

    it('detects LastPass from injected elements', () => {
      vi.stubGlobal('document', {
        documentElement: { attributes: [] },
        body: { attributes: [] },
        querySelector: vi.fn().mockImplementation((selector) => {
          if (selector === '[id*="lastpass"]') return {};
          return null;
        }),
      });
      const info = detectExtensionConflicts();
      expect(info.detected).toBe(true);
      expect(info.conflicts).toContain('LastPass');
    });

    it('returns no conflicts when none detected', () => {
      vi.stubGlobal('document', {
        documentElement: { attributes: [] },
        body: { attributes: [] },
        querySelector: vi.fn().mockReturnValue(null),
      });
      const info = detectExtensionConflicts();
      expect(info.detected).toBe(false);
      expect(info.conflicts).toHaveLength(0);
    });
  });

  describe('getMemoryInfo', () => {
    it('returns memory information when performance.memory is available', () => {
      const mockMemory = {
        jsHeapSizeLimit: 2147483648,
        totalJSHeapSize: 20480000,
        usedJSHeapSize: 10240000,
      };
      vi.stubGlobal('performance', { memory: mockMemory });
      vi.stubGlobal('navigator', { deviceMemory: 8 });

      const info = getMemoryInfo();
      expect(info.jsHeapSizeLimit).toBe(2147483648);
      expect(info.deviceMemory).toBe(8);
    });

    it('handles missing memory information', () => {
      vi.stubGlobal('performance', {});
      vi.stubGlobal('navigator', {});

      const info = getMemoryInfo();
      expect(info.jsHeapSizeLimit).toBeNull();
      expect(info.deviceMemory).toBeNull();
    });
  });

  describe('getThreadingInfo', () => {
    it('detects threading support', () => {
      vi.stubGlobal('Worker', class {});
      vi.stubGlobal('SharedArrayBuffer', class {});
      vi.stubGlobal('window', { crossOriginIsolated: true });
      vi.stubGlobal('navigator', { hardwareConcurrency: 8 });

      const info = getThreadingInfo();
      expect(info.webWorkersSupported).toBe(true);
      expect(info.sharedArrayBufferSupported).toBe(true);
      expect(info.crossOriginIsolated).toBe(true);
      expect(info.hardwareConcurrency).toBe(8);
    });

    it('handles lack of threading support', () => {
      vi.stubGlobal('Worker', undefined);
      vi.stubGlobal('SharedArrayBuffer', undefined);
      vi.stubGlobal('window', { crossOriginIsolated: false });
      vi.stubGlobal('navigator', { hardwareConcurrency: 1 });

      const info = getThreadingInfo();
      expect(info.webWorkersSupported).toBe(false);
      expect(info.sharedArrayBufferSupported).toBe(false);
      expect(info.crossOriginIsolated).toBe(false);
    });
  });

  describe('getBatteryInfo', () => {
    it('returns supported false if getBattery is missing', async () => {
      vi.stubGlobal('navigator', {});
      const info = await getBatteryInfo();
      expect(info.supported).toBe(false);
    });

    it('returns battery information when available', async () => {
      const mockBattery = {
        charging: true,
        level: 0.8,
        chargingTime: 0,
        dischargingTime: Infinity,
      };
      vi.stubGlobal('navigator', {
        getBattery: vi.fn().mockResolvedValue(mockBattery),
      });

      const info = await getBatteryInfo();
      expect(info.supported).toBe(true);
      expect(info.charging).toBe(true);
      expect(info.level).toBe(0.8);
      expect(info.isLowPowerMode).toBe(false);
    });

    it('detects low power mode when battery is low and not charging', async () => {
      const mockBattery = {
        charging: false,
        level: 0.15,
        chargingTime: Infinity,
        dischargingTime: 3600,
      };
      vi.stubGlobal('navigator', {
        getBattery: vi.fn().mockResolvedValue(mockBattery),
      });

      const info = await getBatteryInfo();
      expect(info.isLowPowerMode).toBe(true);
      expect(info.powerSavingHint).toContain('Likely');
    });
  });
});
