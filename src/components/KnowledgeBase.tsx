import React from 'react';

const KnowledgeBase: React.FC = () => {
  const flags = [
    {
      title: 'Browser Name & Version',
      description: 'The specific web browser you are using (e.g., Chrome, Firefox, Safari) and its version number. Support uses this to know which features your browser supports and if it needs an update for security or compatibility.'
    },
    {
      title: 'Operating System',
      description: 'The software that manages your computer or mobile device (e.g., Windows 11, macOS Sonoma, Android 14). Knowing this helps support understand the overall environment and how your device handles files and networking.'
    },
    {
      title: 'Device Type',
      description: 'Identifies if you are using a Desktop/Laptop, a Phone, or a Tablet. This helps support understand the screen size and input methods (like mouse vs. touch) you are using.'
    },
    {
      title: 'IP Address & ISP',
      description: 'Your IP (Internet Protocol) address is a unique identifier for your internet connection. Your ISP (Internet Service Provider) is the company that provides your internet access. Support uses this to troubleshoot connection issues, regional blocks, or network-wide problems.'
    },
    {
      title: 'Cookies Enabled',
      description: 'Cookies are small pieces of data websites store on your device. Most banking and secure sites require cookies to "remember" that you are signed in as you move from page to page.'
    },
    {
      title: 'Local & Session Storage',
      description: 'Modern ways for websites to store data directly in your browser. Like cookies, these are often required for modern web applications to function correctly and remember your preferences.'
    },
    {
      title: 'Do Not Track (DNT)',
      description: 'A browser setting that asks websites not to track your browsing behavior. While many websites respect this, others may not. It is a privacy preference and usually doesn\'t affect site functionality.'
    },
    {
      title: 'Touch Support',
      description: 'Indicates whether your device has a touch-sensitive screen. This helps support understand how you interact with buttons and menus.'
    },
    {
      title: 'Screen & Viewport Resolution',
      description: 'The total size of your screen and the actual size of the browser window. If a website looks "cut off" or elements are overlapping, these measurements help support identify why.'
    },
    {
      title: 'CPU Cores & Device Memory',
      description: 'Rough estimates of your device\'s processing power and RAM. This helps support determine if a device might be struggling with high-performance tasks or if it has enough resources to run complex web apps.'
    },
    {
      title: 'Secure Context (HTTPS)',
      description: 'Confirms if you are browsing over a secure, encrypted connection. Most modern web features (like Geolocation or Camera access) and all secure banking sites require a Secure Context.'
    },
    {
      title: 'Color Scheme & Reduced Motion',
      description: 'Preferences set in your operating system. "Dark Mode" or "Reduce Motion" settings can change how a website looks or behaves. Support checks these if you report that a site looks unusual or has distracting animations.'
    },
    {
      title: 'GPU & Hardware Acceleration',
      description: 'The GPU (Graphics Processing Unit) is the hardware that handles rendering images, animations, and videos on your screen. Hardware Acceleration is a setting that allows your browser to use your device\'s GPU for these tasks, resulting in a smoother experience. If this is disabled or using "software rendering," websites may feel slow or "choppy."'
    }
  ];

  return (
    <div className="knowledge-base">
      <p className="mini-note">Detailed explanations for the diagnostic data shown on this page.</p>
      <div className="kb-grid">
        {flags.map((flag, i) => (
          <div key={i} className="kb-item">
            <h4 className="kb-title">{flag.title}</h4>
            <p className="kb-description">{flag.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBase;
