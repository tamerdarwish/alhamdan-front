import React from 'react';
import PropTypes from 'prop-types'; // استيراد مكتبة PropTypes
import './CartIcon.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartIcon = ({ toggleCart, cartItems, totalPrice }) => {
  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
      {cartItems.length > 0 && (
        <div className="cart-info">
          <span className="cart-item-count">{cartItems.length}</span>
          <span className="cart-total-price">${totalPrice.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

// تحديد الأنواع باستخدام PropTypes
CartIcon.propTypes = {
  toggleCart: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image_url: PropTypes.string
    })
  ),
  totalPrice: PropTypes.number
};

// تحديد القيم الافتراضية باستخدام defaultProps
CartIcon.defaultProps = {
  cartItems: [],
  totalPrice: 0
};

export default CartIcon;
