import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // للانتقال إلى صفحة تعديل المنتج
import './AdminProductListPage.css'; // قم بإنشاء هذا الملف لتنسيق الصفحة

const AdminProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // جلب المنتجات من API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?search=${searchTerm}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <div className="admin-product-list-page">
      <h2>Admin Product List</h2>
      <input
        type="text"
        placeholder="🔍 Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <Link to={`/edit-product/${product.id}`} className="edit-button">
              Edit Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductListPage;
