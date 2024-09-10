// ImageCard.js
import React from 'react';
import './ImageCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ImageCard = ({ image, size, quantity, onSizeChange, onQuantityChange, onRemove }) => {
  return (
    <div className="image-card">
      {/* زر حذف الصورة في الأعلى باستخدام أيقونة */}
      <button className="remove-button" onClick={onRemove}>
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <div className="image-wrapper">
        <img src={image} alt="Selected" className="image-preview" />
      </div>
      
      <div className="image-controls">
        {/* شريط اختيار حجم الصورة */}
        <select value={size} onChange={(e) => onSizeChange(e.target.value)} className="size-select">
          <option value="9x13">9x13</option>
          <option value="10x15">10x15</option>
          <option value="13x18">13x18</option>
          <option value="15x21">15x21</option>
          <option value="20x30">20x30</option>
          <option value="30x40">30x40</option>
          <option value="30x45">30x45</option>
          <option value="50x70">Photo 50x70 </option>
          <option value="50x70">Canvas 50x70 </option>

          <option value="100x70">100x70</option>




        </select>
        
        {/* حقل نصي لاختيار عدد النسخ */}
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          className="quantity-input"
        />
      </div>
    </div>
  );
};

export default ImageCard;
