import React from 'react';

interface SalesDeckProps {
  onBack: () => void;
}

const SalesDeck: React.FC<SalesDeckProps> = ({ onBack }) => {
  return (
    <div className="sales-deck">
      <header className="hero" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button 
          className="btn btn-neutral" 
          onClick={onBack}
          style={{ position: 'absolute', top: '20px', left: '20px' }}
        >
          ← Back
        </button>
        <h1 style={{ marginTop: '20px' }}>UserInfo for Enterprise</h1>
        <p className="sub" style={{ margin: '0 auto' }}>
          Empower your support teams, protect user privacy, and reduce resolution times by up to 40%.
        </p>
      </header>

      <section className="grid">
        {/* Slide 1: The Problem */}
        <div className="card" style={{ gridColumn: 'span 12', background: 'var(--danger-bg)', borderColor: 'var(--danger-border)' }}>
          <h2 style={{ color: 'var(--danger-ink)' }}>The $15 Billion Problem</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--danger-ink)' }}>
            Inefficient technical support costs enterprises billions annually in lost productivity and customer churn. 
            The #1 bottleneck? <strong>Gathering accurate environment details from non-technical users.</strong>
          </p>
          <div className="tech-grid">
            <div className="tech-item" style={{ borderColor: 'var(--danger-border)' }}>
              <div className="label" style={{ color: 'var(--danger-ink)' }}>"What browser are you using?"</div>
              <div className="value">Average time to answer: 4 minutes.</div>
            </div>
            <div className="tech-item" style={{ borderColor: 'var(--danger-border)' }}>
              <div className="label" style={{ color: 'var(--danger-ink)' }}>"Can you send a screenshot?"</div>
              <div className="value">Security risk & manual effort for the user.</div>
            </div>
          </div>
        </div>

        {/* Slide 2: The Solution */}
        <div className="card" style={{ gridColumn: 'span 12', background: 'var(--success-bg)', borderColor: 'var(--success-border)' }}>
          <h2 style={{ color: 'var(--success-ink)' }}>The UserInfo Solution</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--success-ink)' }}>
            A lightweight, zero-install diagnostic suite that translates complex system data into actionable support insights.
          </p>
          <div className="tech-grid">
            <div className="tech-item" style={{ borderColor: 'var(--success-border)' }}>
              <div className="label" style={{ color: 'var(--success-ink)' }}>Zero-Touch Discovery</div>
              <div className="value">No downloads. No extensions. Just one link.</div>
            </div>
            <div className="tech-item" style={{ borderColor: 'var(--success-border)' }}>
              <div className="label" style={{ color: 'var(--success-ink)' }}>Instant Diagnosis</div>
              <div className="value">Auto-detects OS, Browser, IP, ISP, and Hardware.</div>
            </div>
            <div className="tech-item" style={{ borderColor: 'var(--success-border)' }}>
              <div className="label" style={{ color: 'var(--success-ink)' }}>Privacy-First Architecture</div>
              <div className="value">No data leaves the client without permission.</div>
            </div>
          </div>
        </div>

        {/* Slide 3: Security & Compliance */}
        <div className="card" style={{ gridColumn: 'span 6' }}>
          <h3>Enterprise-Grade Security</h3>
          <ul className="steps" style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li><strong>✓ Client-Side Only:</strong> Data is gathered and displayed locally. No central database.</li>
            <li><strong>✓ SOC2/GDPR Ready:</strong> Since you don't store the data, your compliance burden is zero.</li>
            <li><strong>✓ Secure Contexts:</strong> Operates strictly over HTTPS with modern browser security protocols.</li>
          </ul>
        </div>

        {/* Slide 4: ROI */}
        <div className="card" style={{ gridColumn: 'span 6' }}>
          <h3>Return on Investment</h3>
          <ul className="steps" style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li><strong>↓ 40% Reduction</strong> in Average Handle Time (AHT).</li>
            <li><strong>↑ 25% Increase</strong> in First Contact Resolution (FCR).</li>
            <li><strong>↓ 0% Overhead:</strong> Free, open-source, and easy to host.</li>
          </ul>
        </div>

        {/* Slide 5: Deep Customization */}
        <div className="card" style={{ gridColumn: 'span 12' }}>
          <h2>Tailored for Your Workflow</h2>
          <p>UserInfo isn't just a tool; it's a platform that integrates with your existing support stack.</p>
          <div className="kb-grid">
            <div className="kb-item">
              <div className="kb-title">Custom Link Generation</div>
              <div className="kb-description">Pre-fill support emails and subjects so data lands exactly where it needs to go.</div>
            </div>
            <div className="kb-item">
              <div className="kb-title">Modular Extensions</div>
              <div className="kb-description">Enable VPN detection, Knowledge Bases, or Troubleshooting Guides as needed.</div>
            </div>
            <div className="kb-item">
              <div className="kb-title">White-Label Ready</div>
              <div className="kb-description">Apply your own branding and CSS to maintain trust with your customers.</div>
            </div>
          </div>
        </div>

        {/* Slide 6: Call to Action */}
        <div className="card notice success" style={{ gridColumn: 'span 12', textAlign: 'center', padding: '40px' }}>
          <h2>Transform Your Support Experience Today</h2>
          <p>Join hundreds of forward-thinking enterprises using UserInfo to power their support operations.</p>
          <div className="button-row" style={{ justifyContent: 'center', marginTop: '24px' }}>
            <button className="btn btn-primary btn-big" onClick={onBack}>
              Get Started with UserInfo
            </button>
            <button className="btn btn-neutral btn-big" onClick={() => window.print()}>
              Download Deck as PDF
            </button>
          </div>
        </div>
      </section>

      <footer className="footer" style={{ marginTop: '40px' }}>
        © 2026 UserInfo Enterprise Solutions.
      </footer>
    </div>
  );
};

export default SalesDeck;
