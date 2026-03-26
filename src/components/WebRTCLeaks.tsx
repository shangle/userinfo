import React from 'react';
import type { WebRTCInfo } from '../utils/detection';

interface WebRTCLeaksProps {
  info: WebRTCInfo | null;
}

const WebRTCLeaks: React.FC<WebRTCLeaksProps> = ({ info }) => {
  if (!info) {
    return <div className="mini-note">Running WebRTC diagnostics...</div>;
  }

  if (!info || !info.supported) {
    return (
      <div className="friendly-box">
        <h3>WebRTC Not Supported</h3>
        <p className="mini-note">Your browser does not support WebRTC, so no IP leak tests can be performed.</p>
      </div>
    );
  }

  const hasLeak = info.localIps.length > 0 || info.publicIps.length > 0;

  return (
    <>
      <div className="friendly-box">
        <h3>WebRTC Connectivity & IP Leaks</h3>
        <p className="mini-note" style={{ marginTop: 0 }}>
          Checks if your browser reveals your real IP address even when using a VPN or proxy.
        </p>
      </div>

      <div className="tech-grid" style={{ marginTop: '12px' }}>
        <div className="tech-item">
          <div className="label">STUN Server Status</div>
          <div className="value">{info.stunStatus}</div>
        </div>
        <div className="tech-item">
          <div className="label">Local IP Addresses</div>
          <div className="value">
            {info.localIps.length > 0 ? info.localIps.join(', ') : 'None detected'}
          </div>
        </div>
        <div className="tech-item">
          <div className="label">Public IP Addresses (via WebRTC)</div>
          <div className="value">
            {info.publicIps.length > 0 ? info.publicIps.join(', ') : 'None detected'}
          </div>
        </div>
      </div>

      <div className={`status-box ${hasLeak ? 'warning' : 'success'}`} style={{ marginTop: '16px', padding: '12px', borderRadius: '8px', backgroundColor: hasLeak ? '#fff3cd' : '#d4edda', border: `1px solid ${hasLeak ? '#ffeeba' : '#c3e6cb'}` }}>
        <h4 style={{ margin: '0 0 8px 0', color: hasLeak ? '#856404' : '#155724' }}>
          {hasLeak ? 'Potential IP Exposure Detected' : 'No WebRTC IP Leak Detected'}
        </h4>
        <p className="mini-note" style={{ margin: 0, color: hasLeak ? '#856404' : '#155724' }}>
          {hasLeak 
            ? 'Your browser is sharing IP addresses via WebRTC. If you are using a VPN to hide your location, these IPs might reveal your true identity.' 
            : 'Your browser successfully masked your IP addresses during the WebRTC test.'}
        </p>
      </div>

      <details className="help-topic" style={{ marginTop: '12px' }}>
        <summary>What does this mean?</summary>
        <div className="steps">
          <p>WebRTC (Web Real-Time Communication) is used for video calls and file sharing. A "leak" happens when the browser bypasses your VPN to find your "real" local or public IP address.</p>
          <ul>
            <li><strong>Local IPs:</strong> Your address on your home or office network (e.g., 192.168.x.x).</li>
            <li><strong>Public IPs:</strong> Your address on the open internet.</li>
            <li>If you see your real IP here while a VPN is active, your VPN might not be fully protecting your privacy.</li>
          </ul>
        </div>
      </details>
    </>
  );
};

export default WebRTCLeaks;
