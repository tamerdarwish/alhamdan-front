import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import aboutImage from '../../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // لحالة فتح القائمة المنسدلة
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // نحتاج لهذا المرجع لمراقبة النقرات خارج القائمة

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdminLoggedIn(true);
    }

    // إغلاق القائمة المنسدلة عند النقر خارجها
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
        setIsDropdownOpen(false); // إغلاق القائمة المنسدلة إذا كان النقر خارجها
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigation = (hash) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMenuOpen(false); // إغلاق القائمة بعد التفاعل
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
    navigate('/admin/login');
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={aboutImage} alt="Studio Overview" />
          </Link>
        </div>
        <span className="menu-toggle" onClick={() => setMenuOpen(!isMenuOpen)}>
          ☰
        </span>
        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {isAdminLoggedIn ? (
              <>
                <li><Link to="/" onClick={() => setMenuOpen(false)}>الرئيسية</Link></li>
                <li><Link to="/shop" onClick={() => setMenuOpen(false)}>متجرنا</Link></li>
                <li><Link to="/audios" onClick={() => setMenuOpen(false)}>تسجيلات حفلات</Link></li>
                <li><Link to="/login" onClick={() => setMenuOpen(false)}>الدخول الى مناسبة</Link></li>

                <li><Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>لوحة التحكم</Link></li>
                <li><button onClick={handleLogout}>تسجيل الخروج</button></li>
              </>
            ) : (
              <>
                <li><a onClick={() => handleNavigation('about-us')}>الرئيسية</a></li>
                <li><a onClick={() => handleNavigation('about-us')}>من نحن</a></li>
                <li><a onClick={() => handleNavigation('features')}>ميزاتنا</a></li>
                <li><a onClick={() => handleNavigation('gallery')}>من أعمالنا</a></li>
                <li><a onClick={() => handleNavigation('contact-us')}>إتصل بنا</a></li>
                
                {/* قائمة خدماتنا مع التفاعل الجديد */}
                <li 
  className="dropdown" 
  ref={dropdownRef} 
  onClick={() => setIsDropdownOpen(!isDropdownOpen)} // تفعيل الفتح والإغلاق عند النقر
  onMouseEnter={() => setIsDropdownOpen(true)}  // فتح القائمة عند التمرير
  onMouseLeave={() => setIsDropdownOpen(false)} // إغلاق القائمة عند التمرير خارجها
>
  <span className="dropdown-trigger">
   المزيد
    <span className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`}>▼</span>
  </span>
  {isDropdownOpen && (
    <ul className="dropdown-menu">
      <li><Link to="/shop" onClick={() => setMenuOpen(false)}>متجرنا</Link></li>
      <li><Link to="/businesses" onClick={() => setMenuOpen(false)}>ارقام هواتف ومواقع</Link></li>
      <li><Link to="/audios" onClick={() => setMenuOpen(false)}>تسجيلات حفلات</Link></li>
      <li><Link to="/print" onClick={() => setMenuOpen(false)}>إرسال صور للطباعة</Link></li>
      <li><Link to="/login" onClick={() => setMenuOpen(false)}>الدخول الى مناسبة</Link></li>
    </ul>
  )}
</li>

              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
