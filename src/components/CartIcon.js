import React from 'react';
import './CartIcon.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartIcon = ({ toggleCart, cartItems = [], totalPrice = 0 }) => {
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

export default CartIcon;
