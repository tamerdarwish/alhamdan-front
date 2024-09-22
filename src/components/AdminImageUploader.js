import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type validation
import { FaPlus } from 'react-icons/fa';

const ImageUploader = ({ handleAddImages, setUploading }) => {
  const handleChange = async (e) => {
    setUploading(true); // Set uploading state to true when upload starts
    await handleAddImages(e);
    setUploading(false); // Set uploading state to false when upload ends
  };

  return (
    <div>
      <label htmlFor="file-upload" className="upload-button">
        <FaPlus /> إضافة صور جديدة
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

// Define PropTypes for the component
ImageUploader.propTypes = {
  handleAddImages: PropTypes.func.isRequired,
  setUploading: PropTypes.func.isRequired,
};

export default ImageUploader;
