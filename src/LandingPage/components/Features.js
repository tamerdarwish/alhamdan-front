// components/Features.js
import React from 'react';
import './Features.css';

const Features = () => (
  <section id="features" className="features">
    <div className="features-container">
      <h2 className="features-title">What Makes Us Special</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-container">
            <i className="fas fa-trophy feature-icon"></i>
          </div>
          <h3 className="feature-title">Expertise & Professionalism</h3>
          <p className="feature-description">With years of experience, our professional team ensures the highest quality for your wedding memories.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-container">
            <i className="fas fa-camera feature-icon"></i>
          </div>
          <h3 className="feature-title">Advanced Technology</h3>
          <p className="feature-description">We use the latest cameras and equipment to deliver high-quality photos and videos.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-container">
            <i className="fas fa-paint-brush feature-icon"></i>
          </div>
          <h3 className="feature-title">Creative Photography</h3>
          <p className="feature-description">Our creative and unique photography styles will make every moment special.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-container">
            <i className="fas fa-edit feature-icon"></i>
          </div>
          <h3 className="feature-title">Professional Editing</h3>
          <p className="feature-description">Professional editing services to enhance your photos and capture the best moments.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
