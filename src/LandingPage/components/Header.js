// components/Header.js
import React from 'react';
import './Header.css';
import logo from '../../assets/mylogo.png'; // تأكد من المسار الصحيح للشعار

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <img src={logo} alt="Studio Logo" />
        </div>
        <nav className="header-nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about-us">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact-us">Contact Us</a></li>
          </ul>
        </nav>
        <a href="#contact-us" className="header-button">Get a Quote</a>
      </div>
    </header>
  );
};

export default Header;
