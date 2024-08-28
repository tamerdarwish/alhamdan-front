import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || []; // تأكد من أن cartItems موجودة أو قم بتعيينها كقائمة فارغة
  const totalPrice = location.state?.totalPrice || '0.00'; // تعيين المجموع الكلي الافتراضي إذا لم يتم تمريره

  const handleSendOrder = async () => {
    try {
      // إرسال البيانات إلى نقطة النهاية
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send order');
      }

      const result = await response.json();
      console.log('Order sent successfully:', result);
      alert('Your order has been submitted successfully!');
      // إعادة التوجيه أو إجراء آخر بعد إرسال الطلبية
      navigate('/');
    } catch (error) {
      console.error('Error sending order:', error);
      alert('Failed to submit your order. Please try again.');
    }
  };

  return (
    <div className="order-confirmation-container">
      <h2 className="order-confirmation-title">Order Confirmation</h2>
      {cartItems.length > 0 ? (
        <div className="order-details">
          <h3>Items in your order:</h3>
          <ul className="order-items-list">
            {cartItems.map((item, index) => (
              <li key={index} className="order-item">
                <img src={item.image_url} alt={item.name} className="order-item-image" />
                <span className="order-item-name">{item.name}</span>
                <span className="order-item-price">${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="order-summary">
            <h4>Total Price:</h4>
            <p className="order-total-price">${totalPrice}</p>
            <button className="send-order-button" onClick={handleSendOrder}>Send Order</button>
          </div>
        </div>
      ) : (
        <p className="empty-cart-message">No items in the cart.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
