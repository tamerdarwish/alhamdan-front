// components/HeroSection.js
import React from 'react';
import './HeroSection.css';
import heroVideo from '../../assets/hero-bg.mp4'; // الفيديو المحول إلى MP4

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <video autoPlay muted loop className="hero-video">
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Capture Your Special Moments with Us</h1>
        <p className="hero-description">
          At [Studio Name], we turn your cherished moments into beautiful memories with our expert photography and videography services.
        </p>
        <a href="#contact-us" className="hero-button">Contact Us</a>
      </div>
    </section>
  );
};

export default HeroSection;
