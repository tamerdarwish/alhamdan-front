import React from 'react';
import './CartModal.css';

const CartModal = ({ isOpen, onClose, cartItems, removeFromCart, totalPrice }) => {
  if (!isOpen) return null;

  return (
    <div className="cart-modal">
      <button className="close-button" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image_url} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>Total: ${totalPrice.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
