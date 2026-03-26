import React, { useState, useEffect, useMemo } from 'react';
import * as detect from './utils/detection';
import Card from './components/Card';
import Hero from './components/Hero';
import Summary from './components/Summary';
import CommonProblems from './components/CommonProblems';
import Marketing from './components/Marketing';
import Tutorial from './components/Tutorial';
import KnowledgeBase from './components/KnowledgeBase';
import SalesDeck from './components/SalesDeck';
import WebRTCLeaks from './components/WebRTCLeaks';
import GPUAudit from './components/GPUAudit';
import NetworkProtocol from './components/NetworkProtocol';
import ExtensionConflicts from './components/ExtensionConflicts';
import MemoryDiagnostics from './components/MemoryDiagnostics';
import MediaCapabilities from './components/MediaCapabilities';

const App: React.FC = () => {
  const [isLanding, setIsLanding] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSalesDeck, setShowSalesDeck] = useState(false);
  const [browser] = useState(detect.getBrowserInfo());
  const [os] = useState(detect.getOSInfo());
  const [deviceType] = useState(detect.getDeviceType());
  const [gpu] = useState(detect.getGPUInfo());
  const [memory] = useState(detect.getMemoryInfo());
  const [threading] = useState(detect.getThreadingInfo());
  const [network, setNetwork] = useState<detect.NetworkInfo | null>(null);
  const [webrtc, setWebrtc] = useState<detect.WebRTCInfo | null>(null);
  const [protocol, setProtocol] = useState<detect.NetworkProtocolInfo | null>(null);
  const [media, setMedia] = useState<detect.MediaCapabilitiesInfo | null>(null);
  const [extensions, setExtensions] = useState<detect.ExtensionConflictInfo | null>(null);
  const [supportEmail, setSupportEmail] = useState('');
  const [showAllHelp, setShowAllHelp] = useState(false);
  const [generatorEmail, setGeneratorEmail] = useState('');
  const [generatorSubject, setGeneratorSubject] = useState('Online Banking Support Details');
  const [generatedLink, setGeneratedLink] = useState('');
  const [actionStatus, setActionStatus] = useState('When ready, support can have you email or copy your device details.');
  const [generatorStatus, setGeneratorStatus] = useState('Tip: you can send the copied link by email, text message, or chat.');
  const [enabledExtensions, setEnabledExtensions] = useState<string[]>(['help', 'common', 'tech', 'webrtc', 'gpu', 'protocol', 'extensions', 'memory', 'generator', 'kb', 'media']);

  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    detect.getNetworkInfo().then(setNetwork);
    detect.getWebRTCInfo().then(setWebrtc);
    const initialProtocol = detect.getNetworkProtocolInfo();
    setProtocol(initialProtocol);
    detect.getSSLInfo().then(ssl => {
      setProtocol(prev => prev ? { ...prev, ...ssl } : { ...initialProtocol, ...ssl });
    });
    detect.getMediaCapabilitiesInfo().then(setMedia);
    setExtensions(detect.detectExtensionConflicts());
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email') || '';
    const subject = params.get('subject');
    const ext = params.get('ext');
    const mode = params.get('mode');
    const tutorial = params.get('tutorial');

    if (email || subject || ext || mode === 'tool' || mode === 'sales' || tutorial) {
      setIsLanding(false);
    }

    if (mode === 'sales') {
      setShowSalesDeck(true);
    }

    if (tutorial === 'true' || tutorial === '1') {
      setShowTutorial(true);
    }

    if (email) {
      setSupportEmail(email);
      setGeneratorEmail(email);
    }
    if (subject) {
      setGeneratorSubject(subject);
    }
    if (ext) {
      setEnabledExtensions(ext.split(','));
    }
  }, []);

  const techPairs = useMemo(() => {
    const timeZone = (Intl.DateTimeFormat().resolvedOptions() || {}).timeZone || 'Not available';
    const online = typeof navigator.onLine === 'boolean' ? (navigator.onLine ? 'Yes' : 'No') : 'Unknown';
    const language = detect.formatLanguages();
    const screenSize = (window.screen && window.screen.width && window.screen.height) ? (window.screen.width + ' × ' + window.screen.height) : 'Not available';
    const viewportSize = window.innerWidth + ' × ' + window.innerHeight;
    const pixelRatio = window.devicePixelRatio;
    const cores = navigator.hardwareConcurrency || 'Not reported';
    const deviceMemoryReported = (navigator as any).deviceMemory ? (navigator as any).deviceMemory + ' GB (reported)' : 'Not reported';
    const platform = navigator.platform || 'Not reported';
    const vendor = navigator.vendor || 'Not reported';
    const maxTouchPoints = navigator.maxTouchPoints || 'Not reported';
    const referrer = document.referrer || 'None';
    const javaEnabled = (navigator.javaEnabled && typeof navigator.javaEnabled === 'function') ? (navigator.javaEnabled() ? 'Yes' : 'No') : 'Not reported';
    const historyLength = window.history.length || 'Not reported';
    const cookieStatus = detect.cookiesEnabledStatus();
    const localStore = detect.localStorageStatus();
    const sessionStore = detect.sessionStorageStatus();
    const dnt = detect.doNotTrackStatus();
    const touch = detect.touchSupport();
    const colorScheme = detect.colorSchemePreference();
    const reducedMotion = detect.reducedMotionPreference();
    const secureContext = window.isSecureContext ? 'Yes' : 'No';

    const basePairs = [
      ['Browser name', browser.name],
      ['Browser version', browser.version],
      ['Operating system', os],
      ['Device type', deviceType],
    ];

    if (network) {
      basePairs.push(['IP Address', network.ip]);
      basePairs.push(['ISP', network.isp]);
      basePairs.push(['Location', `${network.city}, ${network.region}, ${network.country}`]);
    }

    if (webrtc) {
      basePairs.push(['WebRTC STUN Status', webrtc.stunStatus]);
      if (webrtc.localIps.length > 0) basePairs.push(['WebRTC Local IPs', webrtc.localIps.join(', ')]);
      if (webrtc.publicIps.length > 0) basePairs.push(['WebRTC Public IPs', webrtc.publicIps.join(', ')]);
    }

    basePairs.push(['GPU Vendor', gpu.vendor]);
    basePairs.push(['GPU Renderer', gpu.renderer]);
    basePairs.push(['Hardware Acceleration', gpu.isHardwareAccelerated ? 'Enabled' : 'Disabled (or not detected)']);

    if (memory) {
      basePairs.push(['JS Heap Limit', memory.jsHeapSizeLimit ? Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB' : 'N/A']);
      basePairs.push(['JS Heap Used', memory.usedJSHeapSize ? Math.round(memory.usedJSHeapSize / 1048576) + ' MB' : 'N/A']);
    }

    if (threading) {
      basePairs.push(['Web Workers', threading.webWorkersSupported ? 'Yes' : 'No']);
      basePairs.push(['SharedArrayBuffer', threading.sharedArrayBufferSupported ? 'Yes' : 'No']);
      basePairs.push(['Cross-Origin Isolated', threading.crossOriginIsolated ? 'Yes' : 'No']);
    }

    if (protocol) {
      basePairs.push(['Network Protocol', protocol.protocol]);
      basePairs.push(['HTTP/3 Support', protocol.h3Support]);
      basePairs.push(['QUIC Status', protocol.isQuic ? 'Active' : 'Not active']);
      if (protocol.tlsVersion) basePairs.push(['TLS Version', protocol.tlsVersion]);
      if (protocol.cipherSuite) basePairs.push(['Cipher Suite', protocol.cipherSuite]);
    }

    if (media) {
      basePairs.push(['Widevine DRM', media.widevine ? 'Supported' : 'Not supported']);
      basePairs.push(['PlayReady DRM', media.playready ? 'Supported' : 'Not supported']);
      basePairs.push(['FairPlay DRM', media.fairplay ? 'Supported' : 'Not supported']);
      basePairs.push(['HDCP Status', media.hdcpStatus]);
      basePairs.push(['1080p Decoding', media.decodingInfo.supported ? 'Supported' : 'Not supported']);
    }

    return [
      ...basePairs,
      ['User agent', navigator.userAgent || 'Not available'],
      ['Platform', platform],
      ['Vendor', vendor],
      ['Language', language],
      ['Time zone', timeZone],
      ['Online', online],
      ['Cookies enabled', cookieStatus],
      ['Local storage', localStore],
      ['Session storage', sessionStore],
      ['Secure context', secureContext],
      ['Do Not Track', dnt],
      ['Touch support', touch],
      ['Max_touch_points', maxTouchPoints],
      ['Screen resolution', screenSize],
      ['Available screen size', (window.screen && window.screen.availWidth && window.screen.availHeight) ? (window.screen.availWidth + ' × ' + window.screen.availHeight) : 'Not available'],
      ['Viewport size', viewportSize],
      ['Pixel ratio', String(pixelRatio)],
      ['Color depth', window.screen && window.screen.colorDepth ? String(window.screen.colorDepth) : 'Not available'],
      ['Reported CPU cores', String(cores)],
      ['Reported device memory', deviceMemoryReported],
      ['Java enabled', javaEnabled],
      ['History length', String(historyLength)],
      ['Color scheme preference', colorScheme],
      ['Reduced motion preference', reducedMotion],
      ['Page URL', window.location.href],
      ['Protocol', window.location.protocol],
      ['Referrer', referrer],
      ['Current date/time', now.toString()]
    ];
  }, [browser, os, deviceType, network, now]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email') || '';
    const subject = params.get('subject');
    if (email) {
      setSupportEmail(email);
      setGeneratorEmail(email);
    }
    if (subject) {
      setGeneratorSubject(subject);
    }
  }, []);

  const outdatedWarning = useMemo(() => 
    detect.getOutdatedWarning(browser.name, detect.parseMajorVersion(browser.version), os)
  , [browser, os]);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const success = document.execCommand('copy');
      document.body.removeChild(ta);
      return success;
    }
  };

  const handleEmailSupport = () => {
    if (!detect.isValidEmail(supportEmail)) {
      setActionStatus('Please type a valid support email address first.');
      return;
    }
    const body = [
      'Hello Support,',
      '',
      'I am sending my device and browser details from the support helper page.',
      '',
      ...techPairs.map(([label, value]) => `${label}: ${value}`),
      '',
      'Thank you.'
    ].join('\n');
    
    const href = `mailto:${encodeURIComponent(supportEmail)}?subject=${encodeURIComponent(generatorSubject)}&body=${encodeURIComponent(body)}`;
    setActionStatus('Opening your email program…');
    window.location.href = href;
  };

  const handleCopyInfo = async () => {
    const text = [
      'Read this to Support:',
      `I am using ${browser.name} version ${browser.version} on ${os} on a ${deviceType}.`,
      '',
      ...techPairs.map(([label, value]) => `${label}: ${value}`)
    ].join('\n');

    const success = await copyText(text);
    if (success) {
      setActionStatus('Copied the support details to your clipboard.');
    } else {
      setActionStatus('Could not copy automatically on this browser.');
    }
  };

  const handleGenerateLink = () => {
    if (!detect.isValidEmail(generatorEmail)) {
      setGeneratorStatus('Please type a valid support email address first.');
      return;
    }
    const base = window.location.href.split('?')[0];
    const q = [`email=${encodeURIComponent(generatorEmail)}`];
    if (generatorSubject) q.push(`subject=${encodeURIComponent(generatorSubject)}`);
    if (enabledExtensions.length > 0) q.push(`ext=${enabledExtensions.join(',')}`);
    const link = `${base}?${q.join('&')}`;
    setGeneratedLink(link);
    setGeneratorStatus('Link generated. You can now copy it.');
  };

  const handleCopyLink = async () => {
    if (!generatedLink) {
      handleGenerateLink();
    }
    const link = generatedLink || (detect.isValidEmail(generatorEmail) ? (() => {
      const base = window.location.href.split('?')[0];
      const q = [`email=${encodeURIComponent(generatorEmail)}`];
      if (generatorSubject) q.push(`subject=${encodeURIComponent(generatorSubject)}`);
      if (enabledExtensions.length > 0) q.push(`ext=${enabledExtensions.join(',')}`);
      return `${base}?${q.join('&')}`;
    })() : '');

    if (!link) return;

    const success = await copyText(link);
    if (success) {
      setGeneratorStatus('Support link copied to your clipboard.');
    } else {
      setGeneratorStatus('Could not copy automatically. Please copy the link on screen.');
    }
  };

  const toggleExtension = (ext: string) => {
    setEnabledExtensions(prev => 
      prev.includes(ext) ? prev.filter(e => e !== ext) : [...prev, ext]
    );
  };

  const matchesFilter = (topic: any) => {
    if (showAllHelp) return true;
    const browsers = topic.browsers ? topic.browsers.split(',').map((s: string) => s.trim()) : [];
    const devices = topic.devices ? topic.devices.split(',').map((s: string) => s.trim()) : [];
    const oss = topic.os ? topic.os.split(',').map((s: string) => s.trim()) : [];

    return (browsers.length === 0 || browsers.includes(browser.name)) &&
           (devices.length === 0 || devices.includes(deviceType)) &&
           (oss.length === 0 || oss.includes(os) || (os.startsWith('Windows') && oss.includes('Windows')));
  };

  const helpTopics = [
    {
      title: 'Website will not load, looks broken, or keeps spinning',
      browsers: 'Chrome,Microsoft Edge,Firefox,Safari,Opera,Samsung Internet',
      devices: 'Desktop or Laptop,Phone,Tablet',
      os: 'Windows,macOS,Android,iPhone (iOS),iPad (iPadOS),Linux,Chrome OS',
      steps: [
        'Make sure this page says you are online.',
        'Close the browser tab and open the banking site again.',
        'If it still looks wrong, clear your browser cache using the matching section below.',
        'Try again after fully closing and reopening the browser.',
        'If support asks, copy or email the details from the buttons above.'
      ]
    },
    {
      title: 'Website keeps signing me out or forgetting me',
      browsers: 'Chrome,Microsoft Edge,Firefox,Safari,Opera,Samsung Internet',
      devices: 'Desktop or Laptop,Phone,Tablet',
      os: 'Windows,macOS,Android,iPhone (iOS),iPad (iPadOS),Linux,Chrome OS',
      steps: [
        'Make sure cookies are enabled in your browser.',
        'Check the section below about making sure your browser is not automatically clearing cookies or browsing history.',
        'Avoid using private or incognito browsing if you want the site to remember you.',
        'Close the browser and open it again after changing settings.'
      ]
    },
    {
      title: 'Buttons do not respond or sign-in acts strangely',
      browsers: 'Chrome,Microsoft Edge,Firefox,Safari,Opera,Samsung Internet',
      devices: 'Desktop or Laptop,Phone,Tablet',
      os: 'Windows,macOS,Android,iPhone (iOS),iPad (iPadOS),Linux,Chrome OS',
      steps: [
        'Some banking pages need cookies and saved site data to work correctly.',
        'Make sure you are using a current version of a major browser.',
        'If the page still behaves oddly, clear the cache and try again.',
        'If you have browser add-ons or blockers installed, support may ask you to temporarily disable them.'
      ]
    }
  ];

  return (
    <main className="wrap">
      {isLanding ? (
        <Marketing 
          onStart={() => setIsLanding(false)} 
          onShowSalesDeck={() => {
            setIsLanding(false);
            setShowSalesDeck(true);
          }}
        />
      ) : showSalesDeck ? (
        <SalesDeck onBack={() => {
          setShowSalesDeck(false);
          setIsLanding(true);
        }} />
      ) : (
        <>
          {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
          <div style={{ marginBottom: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn btn-neutral" onClick={() => setIsLanding(true)}>
              ← Back to Overview
            </button>
            <button className="btn btn-secondary" onClick={() => setShowTutorial(true)}>
              ? Staff Walkthrough
            </button>
          </div>
          <Hero browser={browser} os={os} deviceType={deviceType} />

          <section className="grid" aria-label="Support details and tools">
            <Card title="The most important information" className="summary">
              <Summary 
                browser={browser} 
                os={os} 
                deviceType={deviceType} 
                ip={network?.ip || ''} 
                outdatedWarning={outdatedWarning}
              />
            </Card>

            <Card title="Send or copy your details" className="actions">
              <div className="action-layout">
                <div className="field-group">
                  <label className="field-label" htmlFor="supportEmailInput">Support email address</label>
                  <input 
                    className="field-input" 
                    id="supportEmailInput" 
                    type="email" 
                    placeholder="Type a support email address" 
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    aria-describedby="supportEmailNote"
                  />
                  <div className="small-note" id="supportEmailNote">If the page link already includes an email address, it will appear here automatically.</div>
                </div>
                <div className="button-row">
                  <button className="btn btn-primary btn-big" onClick={handleEmailSupport}>Open email</button>
                  <button className="btn btn-neutral btn-big" onClick={handleCopyInfo}>Copy details</button>
                </div>
              </div>
              <div className="small-note" role="status">{actionStatus}</div>
            </Card>

            {enabledExtensions.includes('help') && (
              <Card title="Help with common browser problems" className="help">
                <div className="help-head">
                  <div>
                    <div className="small-note">
                      {showAllHelp ? 'Showing all help topics.' : `Showing topics that best match ${browser.name} on ${os}.`}
                    </div>
                  </div>
                  <button className="btn btn-secondary" onClick={() => setShowAllHelp(!showAllHelp)} aria-pressed={showAllHelp}>
                    {showAllHelp ? 'Show only relevant help' : 'Show all help topics'}
                  </button>
                </div>

                <div className="guide-box">
                  <h3>Friendly troubleshooting guide</h3>
                  <div className="small-note">If you are not sure where to start, go in this order and do just one thing at a time.</div>
                  <div className="guide-steps">
                    <div className="guide-step"><span className="step-number" aria-hidden="true">1</span><strong>Read the top script to support.</strong><br />Tell them your browser, operating system, and device type exactly as shown.</div>
                    <div className="guide-step"><span className="step-number" aria-hidden="true">2</span><strong>Check whether you are online.</strong><br />If the page says you are offline, reconnect to the internet before trying again.</div>
                    <div className="guide-step"><span className="step-number" aria-hidden="true">3</span><strong>Close and reopen the browser.</strong><br />Then return to the banking site and try again.</div>
                  </div>
                </div>

                {helpTopics.filter(matchesFilter).map((topic, i) => (
                  <details key={i} className="help-topic">
                    <summary>{topic.title}</summary>
                    <ol className="steps">
                      {topic.steps.map((step, j) => <li key={j}>{step}</li>)}
                    </ol>
                  </details>
                ))}
              </Card>
            )}

            {enabledExtensions.includes('common') && (
              <Card title="Privacy, VPN, and Tor" className="common-problems">
                <CommonProblems />
              </Card>
            )}

            {enabledExtensions.includes('tech') && (
              <Card title="Technical details for support" className="tech">
                <p className="mini-note">If support needs more detail, open the section below.</p>
                <details>
                  <summary>Show technical details and debugging information</summary>
                  <div className="tech-grid">
                    {techPairs.map(([label, value], i) => (
                      <div key={i} className="tech-item">
                        <div className="label">{label}</div>
                        <div className="value">{value}</div>
                      </div>
                    ))}
                  </div>
                </details>
              </Card>
            )}

            {enabledExtensions.includes('webrtc') && (
              <Card title="WebRTC Connectivity & IP Leaks" className="webrtc">
                <WebRTCLeaks info={webrtc} />
              </Card>
            )}

            {enabledExtensions.includes('protocol') && (
              <Card title="Network Protocol & HTTP/3" className="protocol">
                <NetworkProtocol info={protocol} />
              </Card>
            )}

            {enabledExtensions.includes('gpu') && (
              <Card title="GPU & Hardware Acceleration Audit" className="gpu">
                <GPUAudit info={gpu} />
              </Card>
            )}

            {enabledExtensions.includes('media') && (
              <Card title="Media Capabilities & DRM Check" className="media">
                <MediaCapabilities info={media} />
              </Card>
            )}

            {enabledExtensions.includes('extensions') && (
              <Card title="Browser Extension Conflicts" className="extensions">
                <ExtensionConflicts info={extensions} />
              </Card>
            )}

            {enabledExtensions.includes('memory') && (
              <Card title="Memory & Threading Diagnostics" className="memory">
                <MemoryDiagnostics memory={memory} threading={threading} />
              </Card>
            )}

            {enabledExtensions.includes('kb') && (
              <Card title="Knowledge Base: Understanding your data" className="kb">
                <KnowledgeBase />
              </Card>
            )}

            {enabledExtensions.includes('generator') && (
              <Card title="Create a support link" className="generator">
                <p className="mini-note">Support staff can build a link with an email address, subject, and active extensions.</p>
                <div className="action-layout">
                  <div className="field-group">
                    <label className="field-label" htmlFor="generatorEmail">Support email address</label>
                    <input 
                      className="field-input" 
                      id="generatorEmail" 
                      type="email" 
                      placeholder="support@example.com" 
                      value={generatorEmail}
                      onChange={(e) => setGeneratorEmail(e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label" htmlFor="generatorSubject">Email subject</label>
                    <input 
                      className="field-input" 
                      id="generatorSubject" 
                      type="text" 
                      value={generatorSubject}
                      onChange={(e) => setGeneratorSubject(e.target.value)}
                    />
                  </div>
                </div>

                <fieldset className="extension-toggles">
                  <legend className="small-note" style={{marginBottom: '8px', border: 'none', padding: 0}}>Active Modules (Extensions)</legend>
                  <div className="toggle-list">
                    <label className="toggle-item">
                      <input type="checkbox" checked={enabledExtensions.includes('help')} onChange={() => toggleExtension('help')} /> Help Guide
                    </label>
                    <label className="toggle-item">
                      <input type="checkbox" checked={enabledExtensions.includes('common')} onChange={() => toggleExtension('common')} /> Privacy/VPN
                    </label>
                    <label className="toggle-item">
                      <input type="checkbox" checked={enabledExtensions.includes('tech')} onChange={() => toggleExtension('tech')} /> Tech Details
                    </label>
                    <label className="toggle-item">
                      <input type="checkbox" checked={enabledExtensions.includes('webrtc')} onChange={() => toggleExtension('webrtc')} /> WebRTC Leak Test
                    </label>
                    <label className="toggle-item">
                      <input type="checkbox" checked={enabledExtensions.includes('protocol')} onChange={() => toggleExtension('protocol')} /> Network Protocol
                    </label>
                    <label className="toggle-item">
                      <input type="checkbox" checked={enabledExtensions.includes('gpu')} onChange={() => toggleExtension('gpu')} /> GPU Audit
                    </label>
                    <label className="toggle-item">
                      <input type="checkbox" checked={enabledExtensions.includes('media')} onChange={() => toggleExtension('media')} /> Media & DRM
                    </label>
                    <label className="toggle-item">
                      <input type="checkbox" checked={enabledExtensions.includes('extensions')} onChange={() => toggleExtension('extensions')} /> Extension Audit
                    </label>
                    <label className="toggle-item">
                      <input type="checkbox" checked={enabledExtensions.includes('memory')} onChange={() => toggleExtension('memory')} /> Memory & Threading
                    </label>
                    <label className="toggle-item">
                      <input type="checkbox" checked={enabledExtensions.includes('kb')} onChange={() => toggleExtension('kb')} /> Knowledge Base
                    </label>
                    <label className="toggle-item">
                      <input type="checkbox" checked={enabledExtensions.includes('generator')} onChange={() => toggleExtension('generator')} /> Link Generator
                    </label>
                  </div>
                </fieldset>

                <div className="button-row" style={{marginTop:'18px'}}>
                  <button className="btn btn-primary" onClick={handleGenerateLink}>Generate link</button>
                  <button className="btn btn-neutral" onClick={handleCopyLink}>Copy link</button>
                </div>
                {generatedLink && <div className="generated-link" role="log">{generatedLink}</div>}
                <div className="small-note" role="status">{generatorStatus}</div>
              </Card>
            )}
          </section>
        </>
      )}

      <footer className="footer">Powered by UserInfo.</footer>
    </main>
  );
};

export default App;

