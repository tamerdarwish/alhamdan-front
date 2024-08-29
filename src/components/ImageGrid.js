import React, { useState } from 'react';
import PropTypes from 'prop-types'; // استيراد PropTypes
import { FaPrint, FaTrashAlt } from 'react-icons/fa';
import './ImageGrid.css';  // تأكد من استيراد ملف CSS بشكل صحيح

const ImageGrid = ({ album, handlePrintStatusToggle, watermark_setting }) => {
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

  const downloadImagesWithWatermark = async () => {
    try {
      for (let image of selectedImages) {
        const fileName = image.url.split('/').pop();
        const response = await fetch(`http://localhost:5000/api/upload/watermark/${fileName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ watermark: watermark_setting }),
        });

        if (!response.ok) {
          throw new Error('Failed to download image');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const clearSelection = () => {
    setSelectedImages([]);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div className='album-section'>
      <h2>Album</h2>

      {album.length === 0 ? (
        <p className='no-images'>No images in the album.</p>
      ) : (
        <div className='images-grid'>
          {album.map((image) => (
            <div
              key={image.id}
              className={`image-container ${selectedImages.includes(image) ? 'selected' : ''}`}
            >
              <img
                src={image.url}
                alt={`Album image ${image.id}`}
                className='album-image'
                onClick={() => handleImageClick(image)}
                onDoubleClick={() => handleImageDoubleClick(image)}
                onContextMenu={handleContextMenu}
              />
              <FaPrint
                className={`status-icon ${image.printStatus ? 'checked' : 'unchecked'}`}
                onClick={() => handlePrintStatusToggle(image.id, image.printStatus)}
              />
            </div>
          ))}
        </div>
      )}

      {selectedImages.length > 0 && (
        <div className='download-section'>
          <button onClick={downloadImagesWithWatermark} className='btn download-button'>
            Download Selected with Watermark
          </button>
          <button onClick={clearSelection} className='btn clear-selection-button'>
            <FaTrashAlt /> Clear Selection
          </button>
        </div>
      )}

      {selectedImage && (
        <div className='modal' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <span className='close-button' onClick={closeModal}>&times;</span>
            <img
              src={selectedImage.url}
              alt={`Selected image ${selectedImage.id}`}
              className='modal-image'
              onContextMenu={handleContextMenu}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// تحديد الأنواع باستخدام PropTypes
ImageGrid.propTypes = {
  album: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      printStatus: PropTypes.bool,
    })
  ).isRequired,
  handlePrintStatusToggle: PropTypes.func.isRequired,
  watermark_setting: PropTypes.string.isRequired,
};

export default ImageGrid;
