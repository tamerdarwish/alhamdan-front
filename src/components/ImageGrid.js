import React from 'react';
import { FaArrowLeft, FaPlus, FaTrash, FaSave, FaCheck, FaPrint } from 'react-icons/fa';
import '../pages/EventPage.css'; // إضافة ملف CSS خارجي
import ImageUploader from './ImageUploader';

const ImageGrid = ({
  album,
  selectedImages,
  setSelectedImages,
  handleSelectImage,
  handleDeleteImage,
  handleDeleteSelectedImages,
  handlePrintSelected,
  handleSelectAllImages,
  handleAddImages // استدعاء الدالة لإضافة الصور الجديدة
}) => {
  return (
    <div className="album-section">
      <h2>Album</h2>

      <div className="fixed-button-container">
       
      <button className="upload-button" onClick={handleDeleteSelectedImages}>
            <ImageUploader handleAddImages={handleAddImages} />
      </button>
        <button className="delete-selected-button" onClick={handleDeleteSelectedImages}>
          <FaTrash /> Delete Selected
        </button>

        <button className="print-selected-button" onClick={handlePrintSelected}>
          <FaPrint /> Print Selected
        </button>

        <button className="select-all-button" onClick={handleSelectAllImages}>
          <FaCheck /> Select All
        </button>
      </div>

      {album.length === 0 ? (
        <p className="no-images">No images in the album.</p>
      ) : (
        <div className="images-grid">
          {album.map((image, index) => (
            <div key={index} className="image-container">
              <img src={image.url} alt={`Album image ${index + 1}`} className="album-image" />
              <input
                type="checkbox"
                className="select-checkbox"
                checked={selectedImages.includes(image)}
                onChange={() => handleSelectImage(image)}
              />
              <button
                className="delete-button"
                onClick={() => handleDeleteImage(image.id)}
              >
                <FaTrash />
              </button>
              <FaCheck
                className={`status-icon ${image.printStatus ? 'checked' : 'unchecked'}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
