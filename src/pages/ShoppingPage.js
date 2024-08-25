// ShoppingPage.js
import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import CartModal from '../components/CartModal';
import CartIcon from '../components/CartIcon';

const ShoppingPage = () => {const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <div className="app">
      <header>
        <button onClick={toggleCart} className="cart-icon">🛒 Cart ({cartItems.length})</button>
      </header>
      <main>
        <ProductList onAddToCart={addToCart} />
      </main>
      <CartModal
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
      />
    </div>
  );
};

export default ShoppingPage;
