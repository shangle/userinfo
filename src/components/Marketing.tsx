import React from 'react';

interface MarketingProps {
  onStart: () => void;
}

const Marketing: React.FC<MarketingProps> = ({ onStart }) => {
  return (
    <div className="marketing-page">
      <header className="hero">
        <h1>UserInfo</h1>
        <p className="sub">
          The professional diagnostic tool for modern support teams. 
          Gather technical details from your users without the friction, 
          privacy concerns, or technical jargon.
        </p>
        <div style={{ marginTop: '24px' }}>
          <button className="btn btn-primary btn-big" onClick={onStart}>
            Try the Diagnostic Tool
          </button>
        </div>
      </header>

      <section className="grid">
        <div className="card" style={{ gridColumn: 'span 12' }}>
          <h2>Why UserInfo?</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <div className="label">Zero Friction</div>
              <div className="value">
                Users don't need to install anything. They just open a link and 
                their environment is automatically detected.
              </div>
            </div>
            <div className="tech-item">
              <div className="label">Privacy-First</div>
              <div className="value">
                No data is ever sent to a server automatically. Information is 
                only shared when the user explicitly chooses to.
              </div>
            </div>
            <div className="tech-item">
              <div className="label">Extensible</div>
              <div className="value">
                Modular architecture allows you to enable or disable features 
                like VPN detection, help guides, and link generators.
              </div>
            </div>
            <div className="tech-item">
              <div className="label">Accessible</div>
              <div className="value">
                Designed with clarity in mind. Friendly labels and high contrast 
                make it easy for anyone to read their details to support.
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ gridColumn: 'span 6' }}>
          <h3>Features for Support Teams</h3>
          <ul className="steps" style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li><strong>✓ One-Click Sharing:</strong> Users can copy all details or open their email client pre-filled.</li>
            <li><strong>✓ Contextual Help:</strong> Dynamic troubleshooting steps based on the user's browser and OS.</li>
            <li><strong>✓ Link Generator:</strong> Create custom links for your customers with your support email pre-filled.</li>
          </ul>
        </div>

        <div className="card" style={{ gridColumn: 'span 6' }}>
          <h3>Technical Coverage</h3>
          <ul className="steps" style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li><strong>✓ Modern Detection:</strong> Browser engine, versioning, and OS identification.</li>
            <li><strong>✓ Network Insights:</strong> IP address, ISP, and Geolocation (via client-side API).</li>
            <li><strong>✓ Hardware Info:</strong> Screen resolution, pixel ratio, and device memory.</li>
          </ul>
        </div>

        <div className="card notice success" style={{ gridColumn: 'span 12', textAlign: 'center' }}>
          <h3>Ready to reduce your support resolution time?</h3>
          <p>UserInfo is free, open-source, and ready to be deployed to your own infrastructure.</p>
          <button className="btn btn-primary" onClick={onStart} style={{ marginTop: '12px' }}>
            Launch UserInfo Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Marketing;
