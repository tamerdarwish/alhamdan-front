import React from 'react';
import PropTypes from 'prop-types'; // استيراد PropTypes للتحقق من الأنواع
import './ProductModal.css';

const ProductModal = ({ product, onClose, addToCart }) => {
  return (
    <div className="modal-product-overlay">
      <div className="modal-content show"> {/* تأكد من إضافة الكلاس 'show' هنا */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="product-details">
          <img src={product.image_url} alt={product.name} className="modal-product-image" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          {/*<p className="modal-product-price">₪{product.price.toFixed(2)}</p>*/}
          <button onClick={() => { addToCart(product); onClose(); }} className="add-to-cart-button">
          إضافة إلى السلة   </button>
        </div>
      </div>
    </div>
  );
};

// تحديد الأنواع باستخدام PropTypes
ProductModal.propTypes = {
  product: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired, // `product` يجب أن يكون كائنًا بمواصفات معينة
  onClose: PropTypes.func.isRequired, // `onClose` يجب أن يكون دالة
  addToCart: PropTypes.func.isRequired, // `addToCart` يجب أن يكون دالة
};

export default ProductModal;
