import React, { useState, useEffect } from 'react';
import { getBusinesses, getCategories } from '../services/businesses-api'; // استيراد الوظائف
import './BusinessesPage.css';

const BusinessesPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // حالة للصفحة الحالية
  const itemsPerPage = 5; // عدد العناصر لكل صفحة

  useEffect(() => {
    const fetchBusinesses = async () => {
      const data = await getBusinesses(selectedCategory); // إرسال الفئة المحددة إذا كانت موجودة
      setBusinesses(data);
    };

    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchBusinesses();
    fetchCategories();
  }, [selectedCategory]); // استدعاء التصفية عند تغيير الفئة

  // حساب العناصر التي سيتم عرضها في الصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBusinesses = businesses.slice(indexOfFirstItem, indexOfLastItem);

  // تغيير الصفحة
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // حساب عدد الصفحات
  const totalPages = Math.ceil(businesses.length / itemsPerPage);

  return (
    <div className="businesses-page">
      <header className="page-header">
        <h1>دليل المصالح التجارية</h1>
        <p>اكتشف أفضل المصالح التجارية في منطقتك</p>
      </header>

      <div className="categories-filter">
        <h2>تصفية حسب الفئة</h2>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1); // إعادة تعيين الصفحة إلى الأولى عند تغيير الفئة
          }}
        >
          <option value="">كل الفئات</option>
          {categories.map((category) => (
            <option key={category.category} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      <ul className="businesses-list">
        {currentBusinesses.map((business) => (
          <li key={business.id} className="business-card">
            <h3>{business.title}</h3>
            <p>{business.category}</p>
            <p>{business.address}</p>
            <p>{business.phone}</p>
            <p>{business.description}</p>
            {business.website? <a href={business.website} target="_blank" rel="noopener noreferrer">
              زيارة الموقع الإلكتروني
            </a> : null}

            
          </li>
        ))}
      </ul>

      {/* عناصر الباجينيشن */}
      <div className="pagination">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={currentPage === number + 1 ? 'active' : ''}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BusinessesPage;
