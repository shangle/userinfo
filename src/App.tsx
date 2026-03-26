import React, { useState, useEffect, useMemo } from 'react';
import * as detect from './utils/detection';
import Card from './components/Card';
import Hero from './components/Hero';
import Summary from './components/Summary';

const App: React.FC = () => {
  const [browser] = useState(detect.getBrowserInfo());
  const [os] = useState(detect.getOSInfo());
  const [deviceType] = useState(detect.getDeviceType());
  const [network, setNetwork] = useState<detect.NetworkInfo | null>(null);
  const [supportEmail, setSupportEmail] = useState('');
  const [showAllHelp, setShowAllHelp] = useState(false);
  const [generatorEmail, setGeneratorEmail] = useState('');
  const [generatorSubject, setGeneratorSubject] = useState('Online Banking Support Details');
  const [generatedLink, setGeneratedLink] = useState('');
  const [actionStatus, setActionStatus] = useState('When ready, support can have you email or copy your device details.');
  const [generatorStatus, setGeneratorStatus] = useState('Tip: you can send the copied link by email, text message, or chat.');

  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    detect.getNetworkInfo().then(setNetwork);
  }, []);

  const techPairs = useMemo(() => {
    const timeZone = (Intl.DateTimeFormat().resolvedOptions() || {}).timeZone || 'Not available';
    const online = typeof navigator.onLine === 'boolean' ? (navigator.onLine ? 'Yes' : 'No') : 'Unknown';
    const language = detect.formatLanguages();
    const screenSize = (window.screen && window.screen.width && window.screen.height) ? (window.screen.width + ' × ' + window.screen.height) : 'Not available';
    const viewportSize = window.innerWidth + ' × ' + window.innerHeight;
    const pixelRatio = window.devicePixelRatio;
    const cores = navigator.hardwareConcurrency || 'Not reported';
    const memory = (navigator as any).deviceMemory ? (navigator as any).deviceMemory + ' GB (reported)' : 'Not reported';
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
      ['Reported device memory', memory],
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
    <div className="wrap">
      <Hero browser={browser} os={os} deviceType={deviceType} />

      <section className="grid">
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
              />
              <div className="small-note">If the page link already includes an email address, it will appear here automatically.</div>
            </div>
            <div className="button-row">
              <button className="btn btn-primary btn-big" onClick={handleEmailSupport}>Open email</button>
              <button className="btn btn-neutral btn-big" onClick={handleCopyInfo}>Copy details</button>
            </div>
          </div>
          <div className="small-note">{actionStatus}</div>
        </Card>

        <Card title="Help with common browser problems" className="help">
          <div className="help-head">
            <div>
              <div className="small-note">
                {showAllHelp ? 'Showing all help topics.' : `Showing topics that best match ${browser.name} on ${os}.`}
              </div>
            </div>
            <button className="btn btn-secondary" onClick={() => setShowAllHelp(!showAllHelp)}>
              {showAllHelp ? 'Show only relevant help' : 'Show all help topics'}
            </button>
          </div>

          <div className="guide-box">
            <h3>Friendly troubleshooting guide</h3>
            <div className="small-note">If you are not sure where to start, go in this order and do just one thing at a time.</div>
            <div className="guide-steps">
              <div className="guide-step"><span className="step-number">1</span><strong>Read the top script to support.</strong><br />Tell them your browser, operating system, and device type exactly as shown.</div>
              <div className="guide-step"><span className="step-number">2</span><strong>Check whether you are online.</strong><br />If the page says you are offline, reconnect to the internet before trying again.</div>
              <div className="guide-step"><span className="step-number">3</span><strong>Close and reopen the browser.</strong><br />Then return to the banking site and try again.</div>
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

        <Card title="Create a support link" className="generator">
          <p className="mini-note">Support staff can build a link with an email address and subject.</p>
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
          <div className="button-row" style={{marginTop:'14px'}}>
            <button className="btn btn-primary" onClick={handleGenerateLink}>Generate link</button>
            <button className="btn btn-neutral" onClick={handleCopyLink}>Copy link</button>
          </div>
          {generatedLink && <div className="generated-link">{generatedLink}</div>}
          <div className="small-note">{generatorStatus}</div>
        </Card>
      </section>

      <div className="footer">Powered by UserInfo.</div>
    </div>
  );
};

export default App;

