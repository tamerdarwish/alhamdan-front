import React from 'react';
import { FaPlus, FaTrash, FaPrint, FaCheck } from 'react-icons/fa';


const ImageUploader = ({ handleAddImages ,setUploading }) => {
  const handleChange = async (e) => {
    setUploading(true); // تعيين حالة uploading إلى true عند بدء التحميل
    await handleAddImages(e);
    setUploading(false); // تعيين حالة uploading إلى false عند الانتهاء
  };
  return (
    <div >
      <label htmlFor="file-upload" className="upload-button">
        <FaPlus /> Upload Images
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleChange(e)}
        className="file-input"
      />
    </div>
  );
};

export default ImageUploader;
