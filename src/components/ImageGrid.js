import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import './ImageGrid.css';  // تأكد من استيراد ملف CSS بشكل صحيح
import WatermarkImage from './WatermarkImage';

const ImageGrid = ({ album, handlePrintStatusToggle, watermark_setting }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const downloadImageWithWatermark = async (image) => {
    const fileName = image.url.split('/').pop();
  
    try {
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
    } catch (error) {
      console.error('Error:', error);
    }
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
            <div key={image.id} className="image-container">
              <img
                src={image.url}
                alt={`Album image ${image.id}`}
                className="album-image"
                onClick={() => handleImageClick(image)}
                onContextMenu={handleContextMenu}
              />
              <FaCheck
                className={`status-icon ${image.printStatus ? 'checked' : 'unchecked'}`}
                onClick={() => handlePrintStatusToggle(image.id, image.printStatus)}
              />
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>&times;</span>
            <button onClick={() => downloadImageWithWatermark(selectedImage)} className='download-button'>
              Download  Watermark
            </button>
            <img
              src={selectedImage.url}
              alt={`Selected image ${selectedImage.id}`}
              className="modal-image"
              onContextMenu={handleContextMenu}
            />
          
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
