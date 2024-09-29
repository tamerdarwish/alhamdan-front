import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type validation
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
          <i className="fas fa-cart-plus"></i> إضافة إلى السلة
        </button>
      </div>
    </motion.div>
  );
};

// Define PropTypes for the component
ProductCard.propTypes = {
  product: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
