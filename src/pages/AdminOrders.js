// AdminOrders.js
import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import { fetchOrders } from '../services/order-api'; // تأكد من المسار الصحيح
import './AdminOrders.css';
import { checkAdminAuth } from '../utils/adminAuth';
import { useNavigate  } from 'react-router-dom';



const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h2>جميع الطلبات</h2>
      {orders.length === 0 ? (
        <p className="no-orders">لا توجد طلبات حاليًا</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminOrders;
