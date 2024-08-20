import React, { useState } from 'react';
import { FaArrowLeft, FaPlus, FaTrash, FaPrint, FaCheck } from 'react-icons/fa';
import './AdminImageGrid.css'; // إضافة ملف CSS خارجي
import ImageUploader from './ImageUploader';

const ImageGrid = ({
  album,
  handleDeleteImage,
  handleDeleteSelectedImages,
  handlePrintSelected,
  handleSelectAllImages,
  handleAddImages
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div className="album-section">
      <h2>Album</h2>

      <div className="fixed-button-container">
        <button className="upload-button">
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
                  e.stopPropagation(); // Prevent click from propagating to the image container
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
