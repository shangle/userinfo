import React from 'react';
import type { SecurityInfo } from '../utils/detection';

interface SecurityAuditProps {
  info: SecurityInfo;
}

const SecurityAudit: React.FC<SecurityAuditProps> = ({ info }) => {
  const isIsolated = info.crossOriginIsolated;
  const isSecure = info.isSecureContext;

  return (
    <div className="security-audit-info">
      <div className={`status-badge ${isSecure ? 'status-success' : 'status-danger'}`}>
        Secure Context: {isSecure ? 'Active' : 'Not Detected'}
      </div>

      <div className="tech-grid" style={{ marginTop: '16px' }}>
        <div className="tech-item">
          <div className="label">Cross-Origin Isolated</div>
          <div className="value">{info.crossOriginIsolated ? 'Yes' : 'No'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Secure Context</div>
          <div className="value">{info.isSecureContext ? 'Yes' : 'No'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Cookies Enabled</div>
          <div className="value">{info.cookiesEnabled ? 'Yes' : 'No'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Do Not Track</div>
          <div className="value">{info.doNotTrack}</div>
        </div>
        <div className="tech-item">
          <div className="label">LocalStorage Available</div>
          <div className="value">{info.localStorageAvailable ? 'Yes' : 'No'}</div>
        </div>
        <div className="tech-item">
          <div className="label">SessionStorage Available</div>
          <div className="value">{info.sessionStorageAvailable ? 'Yes' : 'No'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Service Worker Support</div>
          <div className="value">{info.serviceWorkerSupported ? 'Yes' : 'No'}</div>
        </div>
        <div className="tech-item">
          <div className="label">PDF Viewer Support</div>
          <div className="value">{info.pdfViewerEnabled ? 'Yes' : 'No'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Webdriver / Automation</div>
          <div className="value">{info.webdriver ? 'Detected' : 'None Detected'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Privacy Sandbox</div>
          <div className="value">{info.privacySandbox ? 'Detected' : 'Not Active'}</div>
        </div>
      </div>

      {!isIsolated && (
        <div className="info-box" style={{ marginTop: '12px', fontSize: '0.9em', background: '#f0f9ff', border: '1px solid #e0f2fe', padding: '10px', borderRadius: '6px' }}>
          <strong>Info:</strong> <code>crossOriginIsolated</code> is not active. This is expected unless this specific site is configured with strict <code>Cross-Origin-Opener-Policy</code> and <code>Cross-Origin-Embedder-Policy</code> headers.
        </div>
      )}

      {info.webdriver && (
        <div className="info-box" style={{ marginTop: '12px', fontSize: '0.9em', background: '#fff1f2', border: '1px solid #ffe4e6', padding: '10px', borderRadius: '6px' }}>
          <strong>Note:</strong> Browser automation (Webdriver) is active. This is common during testing but can sometimes be a sign of security-altering browser settings.
        </div>
      )}
    </div>
  );
};

export default SecurityAudit;
