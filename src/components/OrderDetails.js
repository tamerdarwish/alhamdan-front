// OrderDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderDetails, updateOrderStatus } from '../services/order-api'; // تأكد من المسار الصحيح
import './OrderDetails.css';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // الحصول على ID الطلبية من عنوان URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(''); // الحالة الحالية
  const [updating, setUpdating] = useState(false); // حالة التحديث

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const data = await fetchOrderDetails(id);
        setOrder(data);
        setStatus(data.status ? 'تمت المعالجة' : 'قيد المعالجة');
        setLoading(false);
      } catch (err) {
        setError('Error fetching order details');
        setLoading(false);
      }
    };

    getOrderDetails();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setUpdating(true);

    try {
      await updateOrderStatus(id, newStatus === 'تمت المعالجة');
      setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
      setUpdating(false);
      // إعادة التوجيه بعد التحديث
      navigate(`/admin/orders`);
    } catch (err) {
      setError('Error updating order status');
      setUpdating(false);
    }
  };

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>Order not found</p>;
  }

  // حساب مجموع السعر النهائي
  const totalAmount = order.cart_items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="order-details-container">
      <h2>تفاصيل الطلبية</h2>
      <div className="order-info">
        <p><span>اسم العميل:</span> {order.customer_name}</p>
        <p><span>السعر الإجمالي:</span> {order.total_price} ₪</p>
        <p><span>العنوان:</span> {order.address}</p>
        <p><span>رقم الهاتف:</span> {order.phone_number}</p>
        <p><span>تاريخ الطلب:</span> {new Date(order.created_at).toLocaleDateString('ar-EG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })} {new Date(order.created_at).toLocaleTimeString('ar-EG')}</p>
        
        {/* تغيير حالة الطلب */}
        <div className="order-status">
          <label htmlFor="status">حالة الطلب:</label>
          <select id="status" value={status} onChange={handleStatusChange} disabled={updating}>
            <option value="قيد المعالجة">قيد المعالجة</option>
            <option value="تمت المعالجة">تمت المعالجة</option>
          </select>
        </div>
      </div>

      <h3>المنتجات</h3>
      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>الصورة</th>
              <th>اسم المنتج</th>
              <th>السعر</th>
            </tr>
          </thead>
          <tbody>
            {order.cart_items.map((item, index) => (
              <tr key={index}>
                <td><img src={item.image_url || 'default-image-url.png'} alt={item.name} className="product-image" /></td>
                <td>{item.name}</td>
                <td>{item.price} ₪</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="order-total">
        <h3>مجموع السعر النهائي: {totalAmount} ₪</h3>
      </div>
    </div>
  );
};

export default OrderDetails;
