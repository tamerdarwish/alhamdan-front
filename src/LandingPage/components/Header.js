// components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import aboutImage from '../../assets/logo.png';

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
          <Link to="/">
            <img src={aboutImage} alt="Studio Overview" />
          </Link>
        </div>
        <span className="menu-toggle" onClick={toggleMenu}>☰</span>
        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
          <li><a onClick={() => handleNavigation('about-us')}>الرئيسية</a></li>
            <li><a onClick={() => handleNavigation('about-us')}>من نحن</a></li>
            <li><a onClick={() => handleNavigation('features')}>ميزاتنا</a></li>
            <li><a onClick={() => handleNavigation('gallery')}>من أعمالنا</a></li>
            <li><a onClick={() => handleNavigation('team')}>فريقنا</a></li>
            <li><a onClick={() => handleNavigation('contact-us')}>إتصل بنا</a></li>
            <li><Link to="/shop">متجرنا</Link></li>
            <li><Link to="/login">الدخول الى مناسبة</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
