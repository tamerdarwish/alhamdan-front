// src/components/PhotoUpload.js
import React from 'react';
import './PhotoUpload.css'; // إضافة تنسيق خاص إذا لزم الأمر

const PhotoUpload = ({ onUpload }) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    onUpload(files);
  };

  return (
    <div className="photo-upload-container">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        id="file-input"
      />
      <label htmlFor="file-input" className="upload-button">
        <span>اختر الصور</span>
      </label>
    </div>
  );
};

export default PhotoUpload;
