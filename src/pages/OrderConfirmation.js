import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';
import { useOrderManager } from '../components/orderManager';
import { sendOrder } from '../services/order-api'; // تأكد من استخدام المسار الصحيح

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const totalPrice = location.state?.totalPrice || '0.00';

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // إضافة حالة لخيار التوصيل
  const [deliveryOption, setDeliveryOption] = useState('home'); // 'home' للتوصيل إلى المنزل و 'store' للاستلام من المحل
  const [errors, setErrors] = useState({});

  // استخدام useOrderManager مع تمرير cartItems و setCartItems
  const { clearCart } = useOrderManager(cartItems, setCartItems);

  const handleSendOrder = () => {
    let validationErrors = {};
    if (!fullName) validationErrors.fullName = 'الاسم الكامل مطلوب';
    
    // التحقق من العنوان فقط إذا كان خيار التوصيل إلى المنزل
    if (deliveryOption === 'home' && !address) validationErrors.address = 'العنوان مطلوب';
    
    if (!phoneNumber) validationErrors.phoneNumber = 'رقم الهاتف مطلوب';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // استدعاء دالة sendOrder لإرسال الطلب
    sendOrder(cartItems, totalPrice, fullName, address, phoneNumber, deliveryOption, clearCart, navigate);
  };

  return (
    <div className="order-confirmation-container">
      <h2 className="order-confirmation-title">تأكيد الطلب</h2>
      {cartItems.length > 0 ? (
        <div className="order-details">
          <h3>المنتجات المضافة إلى سلتك:</h3>
          <ul className="order-items-list">
            {cartItems.map((item, index) => (
              <li key={index} className="order-item">
                <img src={item.image_url} alt={item.name} className="order-item-image" />
                <span className="order-item-name">{item.name}</span>
                <span className="order-item-price">₪{item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="user-details">
            <h4>تفاصيل المستخدم:</h4>
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`user-input ${errors.fullName ? 'input-error' : ''}`}
              required
            />
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
            
            {/* اختيار طريقة التوصيل */}
            <div className="delivery-option">
              <label>طريقة التوصيل:</label>
              <select
                value={deliveryOption}
                onChange={(e) => setDeliveryOption(e.target.value)}
                className="delivery-select"
              >
                <option value="home">توصيل إلى عنوان الزبون</option>
                <option value="store">استلام من المحل</option>
              </select>
            </div>

            {/* إدخال العنوان يظهر فقط إذا كان خيار التوصيل إلى المنزل */}
            {deliveryOption === 'home' && (
              <>
                <input
                  type="text"
                  placeholder="العنوان"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`user-input ${errors.address ? 'input-error' : ''}`}
                  required
                />
                {errors.address && <p className="error-message">{errors.address}</p>}
              </>
            )}

            <input
              type="tel"
              placeholder="رقم الهاتف"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                // تحقق من أن المدخل يتكون من أرقام فقط
                if (/^\d*$/.test(value)) {
                  setPhoneNumber(value);
                }
              }}
              className={`user-input ${errors.phoneNumber ? 'input-error' : ''}`}
              required
            />
            {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
          </div>
          <div className="order-summary">
            <h4>السعر النهائي:</h4>
            <p className="order-total-price">₪{totalPrice}</p>
            <button className="send-order-button" onClick={handleSendOrder}>إرسال الطلبية</button>
          </div>
        </div>
      ) : (
        <p className="empty-cart-message">السلة فارغة.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
