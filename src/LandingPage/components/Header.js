import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import aboutImage from '../../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // حالة دخول الأدمن
  const navigate = useNavigate();

  useEffect(() => {
    // التحقق من وجود رمز التوثيق في localStorage
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleNavigation = (hash) => {
    navigate('/'); // الانتقال إلى الصفحة الرئيسية
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu(); // إغلاق القائمة عند التنقل
    }, 100); // تأخير صغير للتأكد من تحميل الصفحة بالكامل
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // إزالة رمز التوثيق من localStorage وتوجيه الأدمن لصفحة تسجيل الدخول
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false); // تحديث حالة الأدمن
    navigate('/admin/login');
    toggleMenu(); // إغلاق القائمة عند تسجيل الخروج
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" onClick={closeMenu}>
            <img src={aboutImage} alt="Studio Overview" />
          </Link>
        </div>
        <span className="menu-toggle" onClick={toggleMenu}>☰</span>
        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {isAdminLoggedIn ? (
              <>
                <li><Link to="/" onClick={closeMenu}>الرئيسية</Link></li>
                <li><Link to="/shop" onClick={closeMenu}>متجرنا</Link></li>
                <li><Link to="/admin/dashboard" onClick={closeMenu}>لوحة التحكم</Link></li>
                <li><button onClick={handleLogout}>تسجيل الخروج</button></li>
              </>
            ) : (
              <>
                <li><a onClick={() => handleNavigation('about-us')}>الرئيسية</a></li>
                <li><a onClick={() => handleNavigation('about-us')}>من نحن</a></li>
                <li><a onClick={() => handleNavigation('features')}>ميزاتنا</a></li>
                <li><a onClick={() => handleNavigation('gallery')}>من أعمالنا</a></li>
                <li><a onClick={() => handleNavigation('contact-us')}>إتصل بنا</a></li>
                <li><Link to="/shop" onClick={closeMenu}>متجرنا</Link></li>
                <li><Link to="/print" onClick={closeMenu}>إرسال صور للطباعة</Link></li>
                <li><Link to="/login" onClick={closeMenu}>الدخول الى مناسبة</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
