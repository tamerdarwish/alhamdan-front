// src/components/PhotoList.js
import React from 'react';
import './PhotoList.css';

const PhotoList = ({ photos, photoDetails, onSizeChange, onCopiesChange }) => {
  return (
    <div className="photo-list">
      {photos.map((file, index) => (
        <div key={index} className="photo-card">
          <img
            src={URL.createObjectURL(file)}
            alt={`Preview ${index}`}
            className="photo-preview"
          />
          <div className="photo-options">
            <label>
              حجم الصورة
              <select
                value={photoDetails[index].size || '10x15'} // قيمة افتراضية
                onChange={(e) => onSizeChange(index, e.target.value)}
              >
                <option value="9x13">9x13</option>
                <option value="10x15">10x15</option>
                <option value="13x18">13x18</option>
                <option value="15x21">15x21</option>
                <option value="20x30">20x30</option>
                <option value="30x40">30x40</option>
                <option value="30x45">30x45</option>
                <option value="50x70">Photo 50x70</option>
                <option value="50x70">Canvas 50x70</option>
                <option value="100x70">100x70</option>
              </select>
            </label>
            <label>
              عدد النسخ
              <input
                type="number"
                value={photoDetails[index].copies || 1} // قيمة افتراضية
                onChange={(e) => onCopiesChange(index, e.target.value)}
                min="1"
                className="copies-input"
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoList;
