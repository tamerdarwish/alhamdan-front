import React, { useState } from 'react';
import { FaTrash, FaCheck, FaDownload } from 'react-icons/fa';
import Modal from 'react-modal';
import './AdminImageGrid.css';
import ImageUploader from './AdminImageUploader';
import PropTypes from 'prop-types';

Modal.setAppElement('#root');

const ImageGrid = ({
  album,
  selectedImages,
  setSelectedImages,
  handleDeleteImage,
  handleDeleteSelectedImages,
  handleDownloadSelected,
  handleSelectAllImages,
  handleAddImages,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageClick = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
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

  const handleSelectPrintedImages = () => {
    const printedImages = album.filter((image) => image.printStatus === true);
    setSelectedImages(printedImages);
  };

  // Count printed images
  const printedImagesCount = album.filter((image) => image.printStatus).length;

  return (
    <div className="album-section">
      <h2>ألبوم المناسبة</h2>

      {/* Stats Bar */}
      <div className="stats-bar">
        <span>عدد الصور: {album.length}</span>
        <span>عدد الصور المحددة: {selectedImages.length}</span>
        <span>عدد الصور المطبوعة: {printedImagesCount}</span>
      </div>

      <div className="fixed-button-container">
        <button className="upload-button">
          <ImageUploader handleAddImages={handleAddImages} setUploading={setUploading} />
        </button>
        <button className="delete-selected-button" onClick={handleDeleteSelectedImages}>
          <FaTrash /> حذف الصور المحددة
        </button>
        <button className="print-selected-button" onClick={handleDownloadSelected}>
          <FaDownload /> تحميل الصور المحددة
        </button>
        <button className="select-all-button" onClick={handleSelectAllImages}>
          <FaCheck /> تحديد الكل
        </button>
        <button className="select-printed-button" onClick={handleSelectPrintedImages}>
          <FaCheck /> تحديد المطبوعات
        </button>
      </div>

      {uploading && (
        <div className="loading-overlay">
          <div className="spinner-icon"></div>
          <div className="loading-text">جاري التحميل...</div>
        </div>
      )}

      {album.length === 0 && !uploading ? (
        <p className="no-images">ألبوم المناسبة فارغ.</p>
      ) : (
        <div className="images-grid">
          {album.map((image, index) => (
            <div
              key={index}
              className={`image-container ${selectedImages.includes(image) ? 'selected' : ''}`}
              onClick={() => handleImageClick(image)}
              onDoubleClick={() => handleImageDoubleClick(image)}
            >
              <img src={image.url} alt={`Album image ${index + 1}`} className="album-image" />
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage(image.id);
                }}
              >
                <FaTrash />
              </button>
              <FaCheck className={`status-icon ${image.printStatus ? 'checked' : 'unchecked'}`} />
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedImage && (
          <>
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedImage.url} alt={`Selected image`} className="modal-image" />
          </>
        )}
      </Modal>
    </div>
  );
};

ImageGrid.propTypes = {
  album: PropTypes.array.isRequired,
  selectedImages: PropTypes.array.isRequired,
  setSelectedImages: PropTypes.func.isRequired,
  handleDeleteImage: PropTypes.func.isRequired,
  handleDeleteSelectedImages: PropTypes.func.isRequired,
  handleDownloadSelected: PropTypes.func.isRequired,
  handleSelectAllImages: PropTypes.func.isRequired,
  handleAddImages: PropTypes.func.isRequired,
};

export default ImageGrid;
