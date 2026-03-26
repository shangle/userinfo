import React from 'react';
import type { MemoryInfo, ThreadingInfo } from '../utils/detection';

interface MemoryDiagnosticsProps {
  memory: MemoryInfo;
  threading: ThreadingInfo;
}

const MemoryDiagnostics: React.FC<MemoryDiagnosticsProps> = ({ memory, threading }) => {
  const formatBytes = (bytes: number | null) => {
    if (bytes === null) return 'Not available';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const isLowMemory = memory.deviceMemory !== null && memory.deviceMemory <= 4;
  const supportsHighPerf = threading.webWorkersSupported && threading.sharedArrayBufferSupported;

  return (
    <div className="memory-diagnostics-info">
      <div className={`status-badge ${supportsHighPerf ? 'status-success' : 'status-warning'}`}>
        High-Performance Capabilities: {supportsHighPerf ? 'Ready' : 'Limited'}
      </div>

      <div className="tech-grid" style={{ marginTop: '16px' }}>
        <div className="tech-item">
          <div className="label">Reported Device Memory</div>
          <div className="value">{memory.deviceMemory ? memory.deviceMemory + ' GB' : 'Not reported'}</div>
        </div>
        <div className="tech-item">
          <div className="label">JS Heap Size Limit</div>
          <div className="value">{formatBytes(memory.jsHeapSizeLimit)}</div>
        </div>
        <div className="tech-item">
          <div className="label">Used JS Heap</div>
          <div className="value">{formatBytes(memory.usedJSHeapSize)}</div>
        </div>
        <div className="tech-item">
          <div className="label">CPU Cores (Concurrency)</div>
          <div className="value">{threading.hardwareConcurrency || 'Not reported'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Web Workers</div>
          <div className="value">{threading.webWorkersSupported ? 'Supported' : 'Not supported'}</div>
        </div>
        <div className="tech-item">
          <div className="label">SharedArrayBuffer</div>
          <div className="value">{threading.sharedArrayBufferSupported ? 'Supported' : 'Not supported'}</div>
        </div>
        <div className="tech-item">
          <div className="label">Cross-Origin Isolated</div>
          <div className="value">{threading.crossOriginIsolated ? 'Yes' : 'No'}</div>
        </div>
      </div>

      {isLowMemory && (
        <div className="info-box" style={{ marginTop: '12px', fontSize: '0.9em', background: '#fffbeb', border: '1px solid #fef3c7', padding: '10px', borderRadius: '6px' }}>
          <strong>Note:</strong> Your device reports low system memory (4GB or less). Some web applications may experience performance issues or crashes.
        </div>
      )}

      {!threading.sharedArrayBufferSupported && (
        <div className="info-box" style={{ marginTop: '12px', fontSize: '0.9em', background: '#f0f9ff', border: '1px solid #e0f2fe', padding: '10px', borderRadius: '6px' }}>
          <strong>Info:</strong> SharedArrayBuffer is disabled. This is common unless the site has special security headers (Cross-Origin Isolation) enabled.
        </div>
      )}
    </div>
  );
};

export default MemoryDiagnostics;
