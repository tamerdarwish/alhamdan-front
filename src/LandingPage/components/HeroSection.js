// components/HeroSection.js
import React from 'react';
import './HeroSection.css';
import heroVideo from '../../assets/hero-bg.mp4'; // الفيديو المحول إلى MP4
import aboutImage from '../../assets/logo.png';


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
        <h1 className="hero-title">
          {/* يمكنك استبدال النص هنا بنص آخر حسب حاجتك */}
          <img src={aboutImage} alt="Studio Overview" />
          <br />
          نوثق لحظاتكم بكل إتقان
        </h1>
        <p className="hero-description">
          في ستوديو الحمدان، نلتقط تفاصيل مناسباتك الخاصة بجودة عالية واحترافية، لنحول كل لحظة إلى ذكرى خالدة تُحكى للأجيال القادمة.
        </p>
        <a href="#contact-us" className="hero-button">إتصل بنا</a>
      </div>
    </section>
  );
};

export default HeroSection;
