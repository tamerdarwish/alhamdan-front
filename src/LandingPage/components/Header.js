import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import aboutImage from '../../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdminLoggedIn(true);
    }

    // إغلاق القائمة عند النقر خارجها
    const handleClickOutside = (event) => {
      const headerNav = document.querySelector('.header-nav');
      if (isMenuOpen && !headerNav.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleNavigation = (hash) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setMenuOpen(false); // غلق القائمة بعد التحديد
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
    navigate('/admin/login');
    setMenuOpen(false); // غلق القائمة عند تسجيل الخروج
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
            {isAdminLoggedIn ? (
              <>
                <li><Link to="/">الرئيسية</Link></li>
                <li><Link to="/shop">متجرنا</Link></li>
                <li><Link to="/admin/dashboard">لوحة التحكم</Link></li>
                <li><button onClick={handleLogout}>تسجيل الخروج</button></li>
              </>
            ) : (
              <>
                <li><a onClick={() => handleNavigation('about-us')}>الرئيسية</a></li>
                <li><a onClick={() => handleNavigation('about-us')}>من نحن</a></li>
                <li><a onClick={() => handleNavigation('features')}>ميزاتنا</a></li>
                <li><a onClick={() => handleNavigation('gallery')}>من أعمالنا</a></li>
                <li><a onClick={() => handleNavigation('contact-us')}>إتصل بنا</a></li>
                <li><Link to="/shop">متجرنا</Link></li>
                <li><Link to="/print">إرسال صور للطباعة</Link></li>
                <li><Link to="/login">الدخول الى مناسبة</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
