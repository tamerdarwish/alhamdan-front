import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminProductListPage.css';
import { checkAdminAuth } from '../utils/adminAuth';
import { FaPlus } from 'react-icons/fa';
import { adminFetchProducts } from '../services/products-api'; // استيراد الدالة الجديدة

const AdminProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // التحقق من إذا ما كان الأدمن مسجلاً للدخول
    const isAdminAuthenticated = checkAdminAuth();

    // إذا لم يكن الأدمن مسجلاً للدخول، التوجيه لصفحة تسجيل الدخول
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // جلب المنتجات من API
  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await adminFetchProducts(searchTerm); // استخدام الدالة الجديدة
      setProducts(productsData);
    };

    loadProducts();
  }, [searchTerm]);

  return (
    <div className="admin-product-list-page">
      <h2>قائمة منتجات المتجر</h2>
      <input
        type="text"
        placeholder=" إبحث عن منتج ... "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="product-grid">
        <Link to="/admin/newProduct" className="product-card add-product-card">
          <FaPlus className="plus-icon" />
          <p>إضافة منتج جديد</p>
        </Link>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            {/*<p className="product-price">₪{product.price.toFixed(2)}</p>*/}
            <Link to={`/edit-product/${product.id}`} className="edit-button">
              تعديل المنتج
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductListPage;
