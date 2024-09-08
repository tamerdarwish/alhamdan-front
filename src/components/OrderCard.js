import React from 'react';
import './OrderCard.css';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/orders/${order.id}`);
  };

  // تحويل التاريخ والوقت إلى تنسيق مقروء
  const formattedDateTime = new Date(order.created_at).toLocaleString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // 24 ساعة
  });

  // تعيين فئة CSS بناءً على حالة الطلبية
  const cardClass = order.status ? 'order-card processed' : 'order-card pending';

  return (
    <div className={cardClass}>
      <div className="order-header">
        طلبية رقم: {order.id}
      </div>
      <div className="order-details">
        <p><span>اسم العميل:</span> {order.customer_name}</p>
        <p><span>السعر الإجمالي:</span> {order.total_price} ₪</p>
        <p><span>العنوان:</span> {order.address}</p>
        <p><span>رقم الهاتف:</span> {order.phone_number}</p>
        <p><span>تاريخ الطلبية:</span> {formattedDateTime}</p> {/* عرض تاريخ الطلبية والوقت */}
      </div>
      <button onClick={handleViewDetails}>عرض التفاصيل</button>
    </div>
  );
};

export default OrderCard;
