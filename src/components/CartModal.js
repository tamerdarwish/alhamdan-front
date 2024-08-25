// src/components/CartModal.js
import React from 'react';
import './CartModal.css';

const CartModal = ({ isOpen, onClose, cartItems, onRemoveFromCart }) => {
  if (!isOpen) return null;

  return (
    <div className="cart-modal">
      <div className="cart-modal-content">
        <button onClick={onClose} className="close-button">×</button>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image_url} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <button onClick={() => onRemoveFromCart(item.id)} className="remove-from-cart-button">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartModal;
