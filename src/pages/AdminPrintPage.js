import React, { useState, useEffect } from 'react';
import { fetchPrintAlbums } from '../services/printsHandler';
import AdminAlbumCard from '../components/AdminAlbumCard';
import './AdminPrintPage.css'; // تطبيق CSS
import { checkAdminAuth } from '../utils/adminAuth';
import { useNavigate } from 'react-router-dom';

export default function AdminPrintPage() {
  const [printAlbums, setPrintAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // حالة لتخزين قيمة البحث

  const navigate = useNavigate();

  useEffect(() => {
    // التحقق من إذا ما كان الأدمن مسجلاً للدخول
    const isAdminAuthenticated = checkAdminAuth();

    // إذا لم يكن الأدمن مسجلاً للدخول، التوجيه لصفحة تسجيل الدخول
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    const getPrintAlbums = async () => {
      let albums = await fetchPrintAlbums();
      setPrintAlbums(albums);
    };

    getPrintAlbums();
  }, []);

  // تصفية الألبومات بناءً على النص المدخل في شريط البحث
  const filteredAlbums = printAlbums.filter((album) =>
    String(album.customer_name).toLowerCase().includes(searchTerm.toLowerCase()) || // البحث باستخدام اسم العميل
    String(album.status).toLowerCase().includes(searchTerm.toLowerCase()) // البحث باستخدام الحالة
  );
  

  return (
    <div className="admin-print-page">
      <h1 className="page-title">طلبات الطباعة</h1> {/* عنوان الصفحة */}

      {/* شريط البحث */}
      <input
        type="text"
        placeholder="بحث عن طلبات الطباعة..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // تحديث قيمة البحث
        className="search-bar"
      />

      {/* عرض الألبومات المتوافقة مع الفلترة */}
      {filteredAlbums.length > 0 ? (
        filteredAlbums.map((album, index) => (
          <AdminAlbumCard
            key={index}
            name={album.customer_name}
            date={album.created_at}
            img={album.photos[0].url}
            id={album.id}
            status={album.status}
            delivery_method={album.delivery_method}
          />
        ))
      ) : (
        <p>No albums found</p> // رسالة إذا لم توجد ألبومات مطابقة
      )}
    </div>
  );
}
