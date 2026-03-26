import React from 'react';

interface HeroProps {
  browser: { name: string; version: string };
  os: string;
  deviceType: string;
}

const Hero: React.FC<HeroProps> = ({ browser, os, deviceType }) => {
  return (
    <section className="hero">
      <h1>Support Helper</h1>
      <p className="sub">
        This page is meant to make things easy. If someone from support asks, you can simply read the results out loud from this screen.
      </p>
      <div className="support-script">
        <div className="label">Read this to Support</div>
        <div className="text">
          I am using {browser.name} version {browser.version} on {os} on a {deviceType}.
        </div>
      </div>
    </section>
  );
};

export default Hero;
