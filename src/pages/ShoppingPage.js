import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import CartModal from '../components/CartModal';
import './ShoppingPage.css';

const ShoppingPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((current) => {
      localStorage.setItem('cartdata', JSON.stringify([...current,product]))
      return [...current, product]
   } );
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };


  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="shopping-page">
    
      <ProductList addToCart={addToCart} />
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        removeFromCart={removeFromCart}
        totalPrice={totalPrice} 
      />
    </div>
  );
};

export default ShoppingPage;
