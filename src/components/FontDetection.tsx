import React from 'react';
import type { FontInfo } from '../utils/detection';

interface FontDetectionProps {
  info: FontInfo | null;
}

const FontDetection: React.FC<FontDetectionProps> = ({ info }) => {
  if (!info) {
    return <div className="loading-state">Detecting fonts and rendering...</div>;
  }

  const allCriticalFound = info.missing.length === 0;

  return (
    <div className="font-detection-info">
      <div className={`status-badge ${allCriticalFound ? 'status-success' : 'status-warning'}`}>
        System Fonts: {allCriticalFound ? 'All Critical Fonts Present' : `${info.available.length} Fonts Available`}
      </div>

      <div className="tech-grid" style={{ marginTop: '16px' }}>
        <div className="tech-item">
          <div className="label">Pixel Ratio (DPI Scale)</div>
          <div className="value">{info.rendering.pixelRatio}x</div>
        </div>
        <div className="tech-item">
          <div className="label">Font Smoothing</div>
          <div className="value">{info.rendering.fontSmoothing}</div>
        </div>
        <div className="tech-item">
          <div className="label">Text Rendering Hint</div>
          <div className="value">{info.rendering.textRendering}</div>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <div className="label" style={{ fontSize: '0.85em', fontWeight: 'bold', marginBottom: '8px' }}>Available Fonts</div>
        <div className="font-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {info.available.map((font) => (
            <span 
              key={font} 
              className="tag" 
              style={{ 
                padding: '4px 8px', 
                background: '#f3f4f6', 
                borderRadius: '4px', 
                fontSize: '0.85em', 
                fontFamily: `"${font}", sans-serif`,
                border: '1px solid #e5e7eb'
              }}
            >
              {font}
            </span>
          ))}
        </div>
      </div>

      {info.missing.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <div className="label" style={{ fontSize: '0.85em', fontWeight: 'bold', marginBottom: '8px', color: '#6b7280' }}>Missing / Not Detected</div>
          <div className="font-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {info.missing.map((font) => (
              <span 
                key={font} 
                className="tag" 
                style={{ 
                  padding: '4px 8px', 
                  background: '#fef2f2', 
                  borderRadius: '4px', 
                  fontSize: '0.85em', 
                  color: '#991b1b',
                  textDecoration: 'line-through',
                  border: '1px solid #fee2e2'
                }}
              >
                {font}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="info-box" style={{ marginTop: '12px', fontSize: '0.9em', background: '#f0f9ff', border: '1px solid #e0f2fe', padding: '10px', borderRadius: '6px' }}>
        <strong>About Fonts:</strong> Proper font rendering depends on having standard system fonts installed. If fonts are missing, websites might display with fallback fonts which can affect readability.
      </div>
    </div>
  );
};

export default FontDetection;
