import React, { useState, useEffect } from 'react';
import { fetchPrintAlbums } from '../services/printsHandler';
import AdminAlbumCard from '../components/AdminAlbumCard';
import './AdminPrintPage.css'; // تطبيق CSS
import { checkAdminAuth } from '../utils/adminAuth';
import { useNavigate } from 'react-router-dom';

export default function AdminPrintPage() {
  const [printAlbums, setPrintAlbums] = useState([]);

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

  return (
    <div className="admin-print-page">
      <h1 className="page-title">طلبات الطباعة</h1> {/* عنوان الصفحة */}

      {printAlbums.map((album, index) => (
        <AdminAlbumCard
          key={index}
          name={album.customer_name}
          date={album.created_at}
          img={album.photos[0].url}
          id={album.id}
          status={album.status}
          delivery_method={album.delivery_method}

        />
      ))}
    </div>
  );
}
