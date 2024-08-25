import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, removeFromCart, placeOrder }) => {
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image_url} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(index)} className="remove-from-cart-button">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p className="cart-total">Total: ${calculateTotal()}</p>
            <button onClick={placeOrder} className="place-order-button">
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
