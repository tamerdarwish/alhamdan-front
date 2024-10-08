import React, { useState, useEffect } from 'react';
import { getBusinesses, createBusiness, updateBusiness, deleteBusiness, getCategories } from '../services/businesses-api'; // استيراد الوظائف
import './AdminBusinessesPage.css';
import { checkAdminAuth } from '../utils/adminAuth';
import { Link, useNavigate } from 'react-router-dom';



const AdminBusinessesPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const isAdminAuthenticated = checkAdminAuth();
        if (!isAdminAuthenticated) {
            navigate('/admin/login');
        }
    }, [navigate]);

    
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]); // حالة لتخزين الفئات
  const [formData, setFormData] = useState({ title: '', category: '', address: '', phone: '', description: '', website: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBusinesses = async () => {
      const data = await getBusinesses();
      setBusinesses(data);
    };

    const fetchCategories = async () => {
      const data = await getCategories(); // جلب الفئات
      setCategories(data);
    };

    fetchBusinesses();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateBusiness(editingId, formData);
      setEditingId(null);
    } else {
      await createBusiness(formData);
    }
    setFormData({ title: '', category: '', address: '', phone: '', description: '', website: '' });
    // إعادة تحميل البيانات بعد التحديث
    const updatedBusinesses = await getBusinesses();
    setBusinesses(updatedBusinesses);
  };

  const handleEdit = (business) => {
    setEditingId(business.id);
    setFormData(business);
  };

  const handleDelete = async (id) => {
    await deleteBusiness(id);
    const updatedBusinesses = await getBusinesses();
    setBusinesses(updatedBusinesses);
  };

  const filteredBusinesses = businesses.filter(business =>
    business.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <h1>إدارة المحلات التجارية</h1>

      <h6>أضف مصلحة تجارية جديدة</h6>

      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="اسم المحل" required />
        
        {/* قائمة الفئات المنسدلة */}
        <select name="category" value={formData.category} onChange={handleInputChange} required>
          <option value="">اختر الفئة</option>
          {categories.map((category) => (
            <option key={category.category} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
        
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="العنوان" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="الهاتف" required />
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="الوصف" required />
        <input type="url" name="website" value={formData.website} onChange={handleInputChange} placeholder="الموقع الإلكتروني" />
        <button type="submit">{editingId ? 'تعديل' : 'إضافة'} المحل</button>
      </form>

      <h6>إبحث عن مصلحة تجارية معينة</h6>

      <input
        type="text"
        placeholder="اكتب هنا اسم المصلحة التجارية"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <ul className="businesses-list">
        {filteredBusinesses.map((business) => (
          <li key={business.id} className="business-card">
            <h3>{business.title}</h3>
            <p>{business.category}</p>
            <p>{business.address}</p>
            <p>{business.phone}</p>
            <p>{business.description}</p>
            {business.website && <a href={business.website} target="_blank" rel="noopener noreferrer">زيارة الموقع الإلكتروني</a>}
            <button onClick={() => handleEdit(business)}>تعديل</button>
            <button onClick={() => handleDelete(business.id)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBusinessesPage;
