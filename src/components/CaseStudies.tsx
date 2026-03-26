import React from 'react';

const CaseStudies: React.FC = () => {
  const cases = [
    {
      title: "FinTech Support Scaling",
      metric: "30% Reduction in ART",
      description: "A mid-sized digital bank integrated UserInfo into their support flow, eliminating the 'What browser are you using?' back-and-forth and reducing Average Resolution Time by 30%.",
      tags: ["Efficiency", "Accuracy"]
    },
    {
      title: "SaaS Onboarding Success",
      metric: "25% Higher Success Rate",
      description: "An enterprise SaaS platform used UserInfo to identify outdated browsers during onboarding. By providing proactive upgrade prompts, they increased first-time login success by 25%.",
      tags: ["Proactive", "Retention"]
    },
    {
      title: "IT Helpdesk Automation",
      metric: "40% Fewer Tickets",
      description: "A corporate IT department deployed UserInfo's 'Common Problems' guide as a self-service tool, resulting in a 40% reduction in volume for basic connectivity and cookie-related tickets.",
      tags: ["Self-Service", "Scale"]
    }
  ];

  return (
    <div className="card" style={{ gridColumn: 'span 12' }}>
      <h2>Real-World Impact: Case Studies</h2>
      <p className="mini-note">See how leading support teams use UserInfo to streamline their operations.</p>
      
      <div className="tech-grid">
        {cases.map((c, i) => (
          <div key={i} className="tech-item" style={{ borderLeft: '4px solid var(--accent-2)' }}>
            <div className="label" style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>{c.metric}</div>
            <h3 style={{ margin: '8px 0' }}>{c.title}</h3>
            <p className="value" style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>{c.description}</p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              {c.tags.map((tag, j) => (
                <span key={j} className="notice success" style={{ padding: '4px 10px', fontSize: '0.8rem', margin: 0 }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
