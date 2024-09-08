import React, { useState } from 'react';
import { FaPrint, FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';  // استيراد مكتبة react-modal
import './ImageGrid.css';

Modal.setAppElement('#root'); // لتجنب التحذيرات المتعلقة بإمكانية الوصول

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
    <div className="album-section">
      <h2>Album</h2>

      {album.length === 0 ? (
        <p className="no-images">No images in the album.</p>
      ) : (
        <div className="images-grid">
          {album.map((image) => (
            <div
              key={image.id}
              className={`image-container ${selectedImages.includes(image) ? 'selected' : ''}`}
            >
              <img
                src={image.url}
                alt={`Album image ${image.id}`}
                className="album-image"
                onClick={() => handleImageClick(image)}
                onDoubleClick={() => handleImageDoubleClick(image)} // فتح المودال عند النقر المزدوج
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
        <div className="download-section">
          <button onClick={downloadImagesWithWatermark} className="btn download-button">
            Download Selected with Watermark
          </button>
          <button onClick={clearSelection} className="btn clear-selection-button">
            <FaTrashAlt /> Clear Selection
          </button>
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
            <span className="close-button" onClick={closeModal}>&times;</span>
            <img
              src={selectedImage.url}
              alt={`Selected image ${selectedImage.id}`}
              className="modal-image"
              onContextMenu={handleContextMenu}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default ImageGrid;
