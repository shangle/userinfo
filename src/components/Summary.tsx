import React from 'react';

interface SummaryProps {
  browser: { name: string; version: string };
  os: string;
  deviceType: string;
  ip: string;
  outdatedWarning?: string;
}

const Summary: React.FC<SummaryProps> = ({ browser, os, deviceType, ip, outdatedWarning }) => {
  return (
    <div className="big-grid">
      <div className="big-item">
        <div className="big-label">Browser Name</div>
        <div className="big-value">{browser.name}</div>
      </div>
      <div className="big-item">
        <div className="big-label">Operating System</div>
        <div className="big-value">{os}</div>
      </div>
      <div className="big-item">
        <div className="big-label">Device Type</div>
        <div className="big-value">{deviceType}</div>
      </div>
      <div className="big-item">
        <div className="big-label">IP Address</div>
        <div className="big-value">{ip || 'Detecting...'}</div>
      </div>
      {outdatedWarning && <div className="notice warning" style={{gridColumn: 'span 12'}}>{outdatedWarning}</div>}
      <div className="notice success" style={{gridColumn: 'span 12'}}>
        This page does not send your information anywhere by itself. It only shows information on your screen unless you choose to copy it or email it.
      </div>
    </div>
  );
};

export default Summary;
