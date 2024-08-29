// components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (hash) => {
    navigate('/'); // الانتقال إلى الصفحة الرئيسية
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // تأخير صغير للتأكد من تحميل الصفحة بالكامل
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
        <Link to="/"> <a>[Studio Name]</a></Link>
        </div>
        <span className="menu-toggle" onClick={toggleMenu}>☰</span>
        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a onClick={() => handleNavigation('features')}>Features</a></li>
            <li><a onClick={() => handleNavigation('about-us')}>About Us</a></li>
            <li><a onClick={() => handleNavigation('services')}>Services</a></li>
            <li><a onClick={() => handleNavigation('gallery')}>Gallery</a></li>
            <li><a onClick={() => handleNavigation('testimonials')}>Testimonials</a></li>
            <li><a onClick={() => handleNavigation('team')}>Team</a></li>
            <li><a onClick={() => handleNavigation('contact-us')}>Contact Us</a></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/login">My Event</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
