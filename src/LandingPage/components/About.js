// components/AboutUs.js
import React from 'react';
import './About.css';
import aboutImage from '../../assets/about.jpg';

const About = () => (
  <section id="about-us" className="about-us">
    <div className="about-us-container">
      <div className="about-us-image">
        <img src={aboutImage} alt="Studio Overview" />
      </div>
      <div className="about-us-content">
        <h2 className="about-us-title">About Us</h2>
        <p className="about-us-text">
          Welcome to [Studio Name], where we capture your most cherished moments with creativity and precision. Our team of expert photographers and videographers brings years of experience to ensure that every detail of your special day is beautifully preserved.
        </p>
        <p className="about-us-text">
          We specialize in wedding photography and videography, offering a range of services from pre-wedding shoots to full-day coverage. Our commitment to using the latest technology and our creative approach guarantees stunning results that you will treasure forever.
        </p>
        <p className="about-us-text">
          At [Studio Name], your satisfaction is our top priority. We work closely with you to understand your vision and ensure that every moment is captured exactly as you envisioned.
        </p>
      </div>
    </div>
  </section>
);

export default About;
