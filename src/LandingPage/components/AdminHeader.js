// components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import aboutImage from '../../assets/logo.png';

const AdminHeader = () => {
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
         
            <li><Link to="/admin">إدارة قائمة المناسبات</Link></li>
            <li><Link to="/admin/products"> إدارة منتجات المتجر</Link></li>
            <li><Link to="/admin/orders">إدارة الطلبات</Link></li>
            <li><Link to="/admin-printalbums">إدارة الطباعات</Link></li>
            <li><Link to="/">الانتقال للموقع</Link></li>



          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
