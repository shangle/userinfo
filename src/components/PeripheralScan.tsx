import React from 'react';
import type { PeripheralInfo } from '../utils/detection';

interface PeripheralScanProps {
  info: PeripheralInfo | null;
}

const PeripheralScan: React.FC<PeripheralScanProps> = ({ info }) => {
  if (!info) {
    return <div className="small-note">Scanning for peripherals...</div>;
  }

  const { gamepads, midi } = info;

  return (
    <div className="peripheral-scan">
      <div className="tech-item">
        <div className="label">Gamepads Detected</div>
        <div className="value">{gamepads.length}</div>
      </div>
      
      {gamepads.length > 0 && (
        <div className="detail-list">
          {gamepads.map((gp, i) => (
            <div key={i} className="detail-item">
              <strong>{gp.id}</strong> (Buttons: {gp.buttons}, Axes: {gp.axes})
            </div>
          ))}
        </div>
      )}

      <div className="tech-item">
        <div className="label">MIDI Support</div>
        <div className="value">{midi.supported ? 'Supported' : 'Not Supported'}</div>
      </div>

      {midi.supported && (
        <>
          <div className="tech-item">
            <div className="label">MIDI Inputs</div>
            <div className="value">{midi.inputs.length}</div>
          </div>
          {midi.inputs.length > 0 && (
            <div className="detail-list">
              {midi.inputs.map((input, i) => (
                <div key={i} className="detail-item">
                  <strong>{input.name}</strong> - {input.manufacturer} ({input.state})
                </div>
              ))}
            </div>
          )}

          <div className="tech-item">
            <div className="label">MIDI Outputs</div>
            <div className="value">{midi.outputs.length}</div>
          </div>
          {midi.outputs.length > 0 && (
            <div className="detail-list">
              {midi.outputs.map((output, i) => (
                <div key={i} className="detail-item">
                  <strong>{output.name}</strong> - {output.manufacturer} ({output.state})
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {(gamepads.length > 0 || midi.inputs.length > 0) && (
        <div className="alert-box warning" style={{ marginTop: '12px' }}>
          <strong>Note:</strong> Active peripheral devices can sometimes interfere with web application keyboard focus or trigger unexpected browser behaviors.
        </div>
      )}
    </div>
  );
};

export default PeripheralScan;
