import React from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose, addToCart }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="product-details">
          <img src={product.image_url} alt={product.name} className="modal-product-image" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="modal-product-price">${product.price.toFixed(2)}</p>
          <button onClick={() => { addToCart(product); onClose(); }} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
