import React from 'react';
import type { ExtensionConflictInfo } from '../utils/detection';

interface ExtensionConflictsProps {
  info: ExtensionConflictInfo | null;
}

const ExtensionConflicts: React.FC<ExtensionConflictsProps> = ({ info }) => {
  if (!info) {
    return <div className="mini-note">Scanning for extension conflicts...</div>;
  }

  const hasConflicts = info.detected && info.conflicts.length > 0;

  return (
    <>
      <div className="friendly-box">
        <h3>Browser Extension Audit</h3>
        <p className="mini-note" style={{ marginTop: 0 }}>
          Identifies if third-party browser extensions (like Grammarly, Dark Reader, or AdBlockers) are injecting styles or scripts that could cause application errors.
        </p>
      </div>

      <div className={`status-box ${hasConflicts ? 'warning' : 'success'}`} style={{ marginTop: '16px', padding: '12px', borderRadius: '8px', backgroundColor: hasConflicts ? '#fff3cd' : '#d4edda', border: `1px solid ${hasConflicts ? '#ffeeba' : '#c3e6cb'}` }}>
        <h4 style={{ margin: '0 0 8px 0', color: hasConflicts ? '#856404' : '#155724' }}>
          {hasConflicts ? 'Detected Third-Party Extensions' : 'No Extension Conflicts Detected'}
        </h4>
        <p className="mini-note" style={{ margin: 0, color: hasConflicts ? '#856404' : '#155724' }}>
          {hasConflicts 
            ? `We detected ${info.conflicts.length} extension(s) that are actively modifying this page: ${info.conflicts.join(', ')}.` 
            : 'Your browser environment appears to be clean of common third-party injections.'}
        </p>
      </div>

      {hasConflicts && (
        <div className="tech-grid" style={{ marginTop: '12px' }}>
          <div className="tech-item">
            <div className="label">Detected Extensions</div>
            <div className="value">{info.conflicts.join(', ')}</div>
          </div>
        </div>
      )}

      <details className="help-topic" style={{ marginTop: '12px' }}>
        <summary>Why does this matter?</summary>
        <div className="steps">
          <p>Browser extensions are powerful tools, but they often work by "injecting" their own code into every website you visit. This can sometimes lead to:</p>
          <ul>
            <li><strong>Visual Glitches:</strong> Dark mode extensions or "cleaner" tools might hide buttons or change colors incorrectly.</li>
            <li><strong>Input Issues:</strong> Spellcheckers or password managers can interfere with typing or form submission.</li>
            <li><strong>Performance Lag:</strong> Extensions that scan page content can slow down your browser.</li>
            <li><strong>Unexpected Errors:</strong> Script blockers or modified browser globals can break site functionality.</li>
          </ul>
          <p>If you're experiencing issues, try disabling these extensions temporarily to see if the problem persists.</p>
        </div>
      </details>
    </>
  );
};

export default ExtensionConflicts;
