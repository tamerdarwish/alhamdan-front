// components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">{currentYear}&copy;  جميع الحقوق محفوظة لستوديو الحمدان </p>
          <p className="footer-text"> <a href="https://tharwatdarwesh.com/" target="_blank" rel="noopener noreferrer">Darwesh Group </a>تم تصميم وتطوير الموقع بواسطة   </p>
          <ul className="footer-links">
            <li><a href="#about-us">من نحن</a></li>
            <li><a href="#gallery">من أعمالنا </a></li>
            <li><a href="#contact-us">إتصل بنا</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com/studio.alhamdan" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.youtube.com/@user-td2rk7bs7n" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://www.instagram.com/studio_alhmdan/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
