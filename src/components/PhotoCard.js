// components/PhotoCard.js
import React from 'react';

const PhotoCard = ({ photo, index, onSizeChange, onCopiesChange }) => {
  return (
    <div className="photo-card">
      <img src={URL.createObjectURL(photo)} alt={`Uploaded ${index}`} className="photo-preview" />
      <div className="photo-options">
        <label>
          حجم الصورة:
          <select onChange={(e) => onSizeChange(index, e.target.value)}>
            <option value="small">صغير</option>
            <option value="medium">متوسط</option>
            <option value="large">كبير</option>
          </select>
        </label>
        <label>
          عدد النسخ:
          <input type="number" min="1" onChange={(e) => onCopiesChange(index, e.target.value)} />
        </label>
      </div>
    </div>
  );
};

export default PhotoCard;
