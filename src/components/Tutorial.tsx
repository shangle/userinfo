import React, { useState } from 'react';

interface Step {
  title: string;
  content: string;
  target?: string; // CSS selector for highlighting
}

interface TutorialProps {
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      title: 'Welcome to UserInfo',
      content: 'This walkthrough will show you how to use UserInfo to support your customers more effectively.',
    },
    {
      title: 'The Summary Card',
      content: 'This card contains the most critical information: the customer\'s browser, operating system, and IP address. Use this for a quick overview.',
      target: '.summary',
    },
    {
      title: 'Sending & Copying Details',
      content: 'Customers can use these buttons to quickly send their details to your support email or copy them to their clipboard.',
      target: '.actions',
    },
    {
      title: 'Troubleshooting Guide',
      content: 'The "Help" section provides tailored troubleshooting steps based on the customer\'s specific browser and device.',
      target: '.help',
    },
    {
      title: 'Technical Details',
      content: 'If you need deeper diagnostics, the Technical Details section provides information like viewport size, screen resolution, and hardware stats.',
      target: '.tech',
    },
    {
      title: 'Link Generator',
      content: 'As support staff, you can use this tool to generate custom links. These links can pre-fill your support email and enable specific modules for the customer.',
      target: '.generator',
    },
    {
      title: 'All Set!',
      content: 'You\'re now ready to use UserInfo. You can restart this tutorial anytime from the dashboard.',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="tutorial-overlay" role="dialog" aria-labelledby="tutorial-title">
      <div className="tutorial-modal">
        <div className="tutorial-header">
          <h2 id="tutorial-title">{step.title}</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close tutorial">×</button>
        </div>
        <div className="tutorial-body">
          <p>{step.content}</p>
        </div>
        <div className="tutorial-footer">
          <div className="tutorial-progress">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="tutorial-nav">
            {currentStep > 0 && (
              <button className="btn btn-neutral" onClick={handlePrev}>Previous</button>
            )}
            <button className="btn btn-primary" onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .tutorial-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }
        .tutorial-modal {
          background: white;
          border-radius: 12px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          overflow: hidden;
          animation: tutorial-in 0.3s ease-out;
        }
        @keyframes tutorial-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tutorial-header {
          padding: 20px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .tutorial-header h2 {
          margin: 0;
          font-size: 1.25rem;
          color: #1a1a1a;
        }
        .btn-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
          padding: 0 5px;
        }
        .tutorial-body {
          padding: 20px;
          font-size: 1rem;
          line-height: 1.6;
          color: #444;
        }
        .tutorial-footer {
          padding: 15px 20px;
          background: #f9f9f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #eee;
        }
        .tutorial-progress {
          font-size: 0.875rem;
          color: #666;
        }
        .tutorial-nav {
          display: flex;
          gap: 10px;
        }
        ${step.target ? `
          ${step.target} {
            position: relative;
            z-index: 10000;
            outline: 4px solid #3b82f6;
            outline-offset: 4px;
            background: white;
          }
        ` : ''}
      `}</style>
    </div>
  );
};

export default Tutorial;
