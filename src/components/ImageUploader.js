import React from 'react';
import { FaPlus, FaTrash, FaPrint, FaCheck } from 'react-icons/fa';

const ImageUploader = ({ handleAddImages }) => {
  return (
    <div className="fixed-button-container">
      <label htmlFor="file-upload" className="upload-button">
        <FaPlus /> Upload Images
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleAddImages(e.target.files)}
        className="file-input"
      />
    </div>
  );
};

export default ImageUploader;
