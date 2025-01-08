import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // استيراد PropTypes هنا
import './Cart.css';

const Cart = ({ cartItems, removeFromCart }) => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    //const totalPrice = calculateTotal();
    // تمرير cartItems و totalPrice عبر state عند التنقل
    navigate('/order-confirmation', { state: { cartItems} });
  };

  return (
    <div className="cart-container">
      <button className="cart-icon" onClick={handleCartClick}>
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count">{cartItems.length}</span>
      </button>
      {showCart && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h2 className='cart-title'>سلتك</h2>
            <button className="close-cart" onClick={handleCartClick}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p className="empty-cart">سلتك فارغة.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image_url} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    {/*<p>₪{item.price.toFixed(2)}</p>*/}
                    <button onClick={() => removeFromCart(index)}>إزالة</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-summary">
            {/*<p>مجموع الحساب: ₪{calculateTotal()}</p>*/}
            <button onClick={handlePlaceOrder}>إكمال الطلبية</button>
          </div>
        </div>
      )}
    </div>
  );
};

// إضافة PropTypes هنا
Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired
};

export default Cart;
