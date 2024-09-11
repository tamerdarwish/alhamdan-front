import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'; // استيراد PropTypes
import CartIcon from '../components/CartIcon';
import CartModal from '../components/CartModal';
import './ProductDetail.css';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5005/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-page">
      <CartIcon toggleCart={toggleCart} />
      <div className="product-detail-wrapper">
        <img src={product.image_url} alt={product.name} className="product-detail-image" />
        <div className="product-detail-info">
          <h2 className="product-detail-name">{product.name}</h2>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <button onClick={() => addToCart(product)} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={[]} />
    </div>
  );
};

// تحديد الأنواع باستخدام PropTypes
ProductDetail.propTypes = {
  addToCart: PropTypes.func.isRequired
};

export default ProductDetail;
