import React from 'react';
import { motion } from 'framer-motion';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      className="product-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-image-wrapper">
        <img src={product.image_url} alt={product.name} className="product-image" />
      </div>
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button onClick={() => onAddToCart(product)} className="add-to-cart-button">
          <i className="fas fa-cart-plus"></i> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
