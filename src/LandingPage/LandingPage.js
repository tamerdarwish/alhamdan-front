// LandingPage.js
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection'; // إضافة الاستيراد
import Features from './components/Features';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './LandingPage.css';

const LandingPage = () => {
  const scrollToSection = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="LandingPage">
      <Header scrollToSection={scrollToSection} />
      <HeroSection /> 
      <Features />
      <About />
      {/*<Services />*/}
      <Gallery />
      {/*<Testimonials />*/}
      <Team />
      <Contact />
      <Footer />

    </div>
  );
};

export default LandingPage;
