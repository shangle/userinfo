import React from 'react';
import type { GPUInfo } from '../utils/detection';

interface GPUAuditProps {
  info: GPUInfo;
}

const GPUAudit: React.FC<GPUAuditProps> = ({ info }) => {
  return (
    <div className="gpu-audit-info">
      <div className={`status-badge ${info.isHardwareAccelerated ? 'status-success' : 'status-warning'}`}>
        Hardware Acceleration: {info.isHardwareAccelerated ? 'Enabled' : 'Disabled / Software Rendering'}
      </div>
      
      <div className="tech-grid" style={{ marginTop: '16px' }}>
        <div className="tech-item">
          <div className="label">GPU Vendor</div>
          <div className="value">{info.vendor}</div>
        </div>
        <div className="tech-item">
          <div className="label">GPU Renderer</div>
          <div className="value">{info.renderer}</div>
        </div>
      </div>

      {!info.isHardwareAccelerated && (
        <div className="info-box" style={{ marginTop: '12px', fontSize: '0.9em', background: '#fffbeb', border: '1px solid #fef3c7', padding: '10px', borderRadius: '6px' }}>
          <strong>Note:</strong> When hardware acceleration is disabled, some websites may feel slow or "choppy." This can usually be turned on in your browser settings.
        </div>
      )}
    </div>
  );
};

export default GPUAudit;
