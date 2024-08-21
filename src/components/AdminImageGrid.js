import React, { useState } from 'react';
import { FaTrash, FaCheck, FaPrint } from 'react-icons/fa';
import './AdminImageGrid.css';
import ImageUploader from './ImageUploader';

const ImageGrid = ({
  album,
  selectedImages,
  setSelectedImages,
  handleDeleteImage,
  handleDeleteSelectedImages,
  handlePrintSelected,
  handleSelectAllImages,
  handleAddImages
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageClick = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter(img => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleImageDoubleClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // وظيفة جديدة لتحديد الصور التي تحتوي على printStatus بقيمة true
  const handleSelectPrintedImages = () => {
    const printedImages = album.filter(image => image.printStatus === true);
    setSelectedImages(printedImages);
  };

  return (
    <div className="album-section">
      <h2>Album</h2>

      <div className="fixed-button-container">
        <button className="upload-button">
          <ImageUploader handleAddImages={handleAddImages} setUploading={setUploading} />
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
        <button className="select-printed-button" onClick={handleSelectPrintedImages}>
          <FaCheck /> Select Printed
        </button>
      </div>

      {uploading && (
        <div className="loading-overlay">
          <div className="spinner-icon"></div>
          <div className="loading-text">Uploading...</div>
        </div>
      )}

      {album.length === 0 && !uploading ? (
        <p className="no-images">No images in the album.</p>
      ) : (
        <div className="images-grid">
          {album.map((image, index) => (
            <div 
              key={index} 
              className={`image-container ${selectedImages.includes(image) ? 'selected' : ''}`}
              onClick={() => handleImageClick(image)}
              onDoubleClick={() => handleImageDoubleClick(image)}
            >
              <img 
                src={image.url} 
                alt={`Album image ${index + 1}`} 
                className="album-image" 
              />
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage(image.id);
                }}
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

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>&times;</span>
            <img
              src={selectedImage.url}
              alt={`Selected image`}
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
