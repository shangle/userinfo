import React from 'react';
import type { BatteryInfo } from '../utils/detection';

interface BatteryStatusProps {
  info: BatteryInfo | null;
}

const BatteryStatus: React.FC<BatteryStatusProps> = ({ info }) => {
  if (!info) {
    return <div className="loading">Gathering battery information...</div>;
  }

  if (!info.supported) {
    return (
      <div className="status-item">
        <div className="label">Battery API</div>
        <div className="value status-warn">Not supported by this browser</div>
      </div>
    );
  }

  const levelPercent = info.level !== null ? Math.round(info.level * 100) : null;
  const isCritical = info.level !== null && info.level <= 0.1;
  const isWarning = info.level !== null && info.level <= 0.2;

  let levelClass = 'status-good';
  if (isCritical) levelClass = 'status-bad';
  else if (isWarning) levelClass = 'status-warn';

  return (
    <div className="battery-diagnostics">
      <div className="tech-grid">
        <div className="tech-item">
          <div className="label">Battery Level</div>
          <div className={`value ${levelClass}`}>
            {levelPercent !== null ? `${levelPercent}%` : 'Unknown'}
          </div>
        </div>
        <div className="tech-item">
          <div className="label">Charging Status</div>
          <div className="value">
            {info.charging === true ? 'Charging' : info.charging === false ? 'Discharging' : 'Unknown'}
          </div>
        </div>
        <div className="tech-item">
          <div className="label">Power Saving Mode</div>
          <div className={`value ${info.isLowPowerMode ? 'status-warn' : 'status-good'}`}>
            {info.powerSavingHint || 'Unknown'}
          </div>
        </div>
        {info.chargingTime !== null && info.chargingTime !== 0 && info.chargingTime !== Infinity && (
          <div className="tech-item">
            <div className="label">Time to Full</div>
            <div className="value">{Math.round(info.chargingTime / 60)} minutes</div>
          </div>
        )}
        {info.dischargingTime !== null && info.dischargingTime !== 0 && info.dischargingTime !== Infinity && (
          <div className="tech-item">
            <div className="label">Time Remaining</div>
            <div className="value">{Math.round(info.dischargingTime / 60)} minutes</div>
          </div>
        )}
      </div>
      {info.isLowPowerMode && (
        <div className="status-box status-warn" style={{ marginTop: '12px', fontSize: '0.9em' }}>
          <strong>Performance Note:</strong> Your device appears to be in a power-saving mode. 
          This can throttle JavaScript execution, leading to slower page loads or unresponsive interactions.
        </div>
      )}
    </div>
  );
};

export default BatteryStatus;
