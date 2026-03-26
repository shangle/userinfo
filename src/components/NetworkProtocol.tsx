import React from 'react';
import type { NetworkProtocolInfo } from '../utils/detection';

interface NetworkProtocolProps {
  info: NetworkProtocolInfo | null;
}

const NetworkProtocol: React.FC<NetworkProtocolProps> = ({ info }) => {
  if (!info) {
    return <div>Gathering network protocol info...</div>;
  }

  const isH3Supported = info.isHttp3 || info.h3Support === 'Supported & Active' || info.h3Support === 'Browser Supports (Not Active)';

  return (
    <div className="network-protocol-info">
      <div className={`status-badge ${info.isHttp3 ? 'status-success' : (isH3Supported ? 'status-neutral' : 'status-warning')}`}>
        HTTP/3 Support: {info.h3Support}
      </div>
      
      <div className="tech-grid" style={{ marginTop: '16px' }}>
        <div className="tech-item">
          <div className="label">Current Protocol</div>
          <div className="value">{info.protocol || 'Unknown'}</div>
        </div>
        <div className="tech-item">
          <div className="label">QUIC Protocol</div>
          <div className="value">{info.isQuic ? 'Detected' : 'Not Detected'}</div>
        </div>
        <div className="tech-item">
          <div className="label">TLS Version</div>
          <div className="value">{info.tlsVersion || 'Detecting...'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Cipher Suite</div>
          <div className="value" style={{ fontSize: '0.8em', wordBreak: 'break-all' }}>{info.cipherSuite || 'Detecting...'}</div>
        </div>
      </div>

      <div className="info-box" style={{ marginTop: '12px', fontSize: '0.9em', background: '#f0f9ff', border: '1px solid #e0f2fe', padding: '10px', borderRadius: '6px' }}>
        <strong>About HTTP/3:</strong> HTTP/3 is the newest version of the protocol that powers the web. It uses QUIC to make connections faster, more reliable, and more secure, especially on cellular or unstable networks.
      </div>
    </div>
  );
};

export default NetworkProtocol;
