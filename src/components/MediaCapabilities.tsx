import React from 'react';
import type { MediaCapabilitiesInfo } from '../utils/detection';

interface MediaCapabilitiesProps {
  info: MediaCapabilitiesInfo | null;
}

const MediaCapabilities: React.FC<MediaCapabilitiesProps> = ({ info }) => {
  if (!info) {
    return <div className="loading-shimmer" style={{ height: '100px' }}>Loading media capabilities...</div>;
  }

  const drmCount = [info.widevine, info.playready, info.fairplay].filter(Boolean).length;

  return (
    <div className="media-capabilities-info">
      <div className={`status-badge ${drmCount > 0 ? 'status-success' : 'status-warning'}`}>
        DRM Support: {drmCount > 0 ? `${drmCount} System(s) Detected` : 'None Detected'}
      </div>
      
      <div className="tech-grid" style={{ marginTop: '16px' }}>
        <div className="tech-item">
          <div className="label">Widevine (Google)</div>
          <div className="value">{info.widevine ? 'Supported' : 'Not supported'}</div>
        </div>
        <div className="tech-item">
          <div className="label">PlayReady (Microsoft)</div>
          <div className="value">{info.playready ? 'Supported' : 'Not supported'}</div>
        </div>
        <div className="tech-item">
          <div className="label">FairPlay (Apple)</div>
          <div className="value">{info.fairplay ? 'Supported' : 'Not supported'}</div>
        </div>
        <div className="tech-item">
          <div className="label">HDCP Status</div>
          <div className="value" style={{ textTransform: 'capitalize' }}>{info.hdcpStatus}</div>
        </div>
      </div>

      <div className="sub-section" style={{ marginTop: '16px' }}>
        <h4 style={{ fontSize: '0.9em', marginBottom: '8px', color: '#666' }}>Video Decoding (1080p 60fps)</h4>
        <div className="tech-grid">
          <div className="tech-item">
            <div className="label">Supported</div>
            <div className="value">{info.decodingInfo.supported ? 'Yes' : 'No'}</div>
          </div>
          <div className="tech-item">
            <div className="label">Smooth</div>
            <div className="value">{info.decodingInfo.smooth ? 'Yes' : 'No'}</div>
          </div>
          <div className="tech-item">
            <div className="label">Power Efficient</div>
            <div className="value">{info.decodingInfo.powerEfficient ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>

      {!info.widevine && !info.playready && !info.fairplay && (
        <div className="info-box" style={{ marginTop: '12px', fontSize: '0.9em', background: '#fffbeb', border: '1px solid #fef3c7', padding: '10px', borderRadius: '6px' }}>
          <strong>Note:</strong> DRM (Digital Rights Management) is required by many video streaming services. If none are supported, you may have trouble playing protected content.
        </div>
      )}
    </div>
  );
};

export default MediaCapabilities;
