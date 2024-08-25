import React from 'react';

const CartIcon = ({ toggleCart }) => {
  return (
    <div className="cart-icon" onClick={toggleCart}>
      🛒
    </div>
  );
};

export default CartIcon;
