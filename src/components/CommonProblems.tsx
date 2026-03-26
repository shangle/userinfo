import React from 'react';

const CommonProblems: React.FC = () => {
  return (
    <>
      <div className="friendly-box">
        <h3>Privacy & Connectivity</h3>
        <p className="mini-note" style={{marginTop: 0}}>Settings that can affect how websites recognize you or your location.</p>
      </div>

      <details className="help-topic">
        <summary>Cookies and Site Data</summary>
        <div className="steps">
          <p>Websites use <strong>Cookies</strong> to remember who you are after you sign in. If cookies are blocked or automatically cleared, you may be signed out immediately or the site may not load your preferences.</p>
          <ul>
            <li>Check if your browser is in "Incognito" or "Private" mode.</li>
            <li>Ensure "Block all cookies" is turned off in your browser settings.</li>
            <li>Some "System Cleaner" apps may delete cookies while your browser is open.</li>
          </ul>
        </div>
      </details>

      <details className="help-topic">
        <summary>VPN (Virtual Private Network)</summary>
        <div className="steps">
          <p>A <strong>VPN</strong> hides your real IP address and makes it look like you are in a different city or country. While great for privacy, some secure sites (like banking or work portals) may flag this as suspicious activity.</p>
          <ul>
            <li>If a site won't let you sign in, try temporarily turning off your VPN.</li>
            <li>Check if your VPN "Kill Switch" is preventing your internet from working.</li>
            <li>Ensure your VPN is set to a region that matches your actual home or office location.</li>
          </ul>
        </div>
      </details>

      <details className="help-topic">
        <summary>Tor Browser and Proxies</summary>
        <div className="steps">
          <p>The <strong>Tor Browser</strong> and various <strong>Web Proxies</strong> provide high levels of anonymity. However, because they are often used to bypass security, many high-security websites block them entirely.</p>
          <ul>
            <li>If you are using Tor, try a standard browser like Chrome, Edge, or Safari instead.</li>
            <li>Check your system's "Proxy Settings" to ensure you haven't accidentally enabled a proxy.</li>
            <li>Proxies can significantly slow down your connection, causing sites to "time out" or spin forever.</li>
          </ul>
        </div>
      </details>
    </>
  );
};

export default CommonProblems;
