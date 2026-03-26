import React from 'react';
import type { BotDetectionInfo } from '../utils/detection';

interface BotDetectionProps {
  info: BotDetectionInfo | null;
}

const BotDetection: React.FC<BotDetectionProps> = ({ info }) => {
  if (!info) return <div className="loading-small">Detecting automation flags...</div>;

  return (
    <div className="bot-detection-info">
      <div className={`status-badge ${info.isBot ? 'status-danger' : 'status-success'}`}>
        Automation Status: {info.isBot ? 'Detected' : 'None Detected'}
      </div>

      <div className="tech-grid" style={{ marginTop: '16px' }}>
        <div className="tech-item">
          <div className="label">Navigator Webdriver</div>
          <div className="value">{info.webdriver ? 'Yes' : 'No'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Selenium/PhantomJS</div>
          <div className="value">{info.selenium || info.phantomJS ? 'Yes' : 'No'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Nightmare.js</div>
          <div className="value">{info.nightmare ? 'Yes' : 'No'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Webdriver Globals</div>
          <div className="value">{info.webdriverEvaluate || info.webdriverScriptFn || info.webdriverReturnValue ? 'Yes' : 'No'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Node.js Primaries</div>
          <div className="value">{info.buffer || info.emit || info.spawn ? 'Yes' : 'No'}</div>
        </div>
      </div>

      {info.isBot && (
        <div className="info-box" style={{ marginTop: '12px', fontSize: '0.9em', background: '#fff1f2', border: '1px solid #ffe4e6', padding: '10px', borderRadius: '6px' }}>
          <strong>Note:</strong> This browser appears to be controlled by automation tools. This is often seen in testing environments, but may also indicate bot-like behavior or certain browser privacy extensions.
        </div>
      )}

      {!info.isBot && (
        <div className="info-box" style={{ marginTop: '12px', fontSize: '0.9em', background: '#f0fdf4', border: '1px solid #dcfce7', padding: '10px', borderRadius: '6px' }}>
          <strong>Safe:</strong> No common automation signatures were detected in this browser session.
        </div>
      )}
    </div>
  );
};

export default BotDetection;
