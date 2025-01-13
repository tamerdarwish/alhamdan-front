// LandingPage.js
import React from 'react';
import HeroSection from './components/HeroSection'; // إضافة الاستيراد
import Features from './components/Features';
import About from './components/About';
import Gallery from './components/Gallery';
import Team from './components/Team';
import Contact from './components/Contact';
import './LandingPage.css';
import PrintPhotosSection from './components/PrintPhotosSection';

const LandingPage = () => {
 
  return (
    <div className="LandingPage">
      
      <HeroSection />
      <About /> 
      <Features />
    
      {/*<Services />*/}
      <Gallery />
      <PrintPhotosSection/>
      {/*<Testimonials />*/}
      {/*<Team />*/}
      <Contact />

    </div>
  );
};

export default LandingPage;
