import React, { useState } from 'react';
import { FaPrint, FaCheckSquare, FaCloudDownloadAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import './ImageGrid.css';
import { downloadImagesWithWatermark } from '../services/images-api';

Modal.setAppElement('#root');

const ImageGrid = ({ album, handlePrintStatusToggle, watermark_setting, eventId }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPressing, setIsPressing] = useState(false);
  let pressTimer;

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

  const selectAllImages = () => {
    if (selectedImages.length === album.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(album);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault(); // منع القائمة السياقية
  };

  const printedImagesCount = album.filter(image => image.printStatus).length;

  const handleMouseDown = () => {
    setIsPressing(true);
    pressTimer = setTimeout(() => {
      setIsPressing(false);
    }, 300); // تحديد وقت الضغط المطول (300 مللي ثانية)
  };

  const handleMouseUp = (image) => {
    clearTimeout(pressTimer);
    if (isPressing) {
      // لا تفعل شيئًا هنا لتجنب الضغط المطول
    } else {
      handleImageClick(image); // السماح بالضغط العادي
    }
    setIsPressing(false);
  };

  return (
    <div className="album-section">
      <h2>ألبوم الصور</h2>
      <div className="stats-bar">
        <span>عدد الصور: {album.length}</span>
        <span>عدد الصور المحددة: {selectedImages.length}</span>
        <span>عدد الصور المطبوعة: {printedImagesCount}</span>
      </div>

      {album.length === 0 ? (
        <p className="no-images">الألبوم فارغ.</p>
      ) : (
        <div className="images-grid">
          {album.map((image) => (
            <div
              key={image.id}
              className={`image-container ${selectedImages.includes(image) ? 'selected' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseUp={() => handleMouseUp(image)}
              onDoubleClick={() => handleImageDoubleClick(image)}
              onContextMenu={handleContextMenu} // منع القائمة السياقية
              draggable="false"
            >
              <img
                src={image.url}
                alt={`Album image ${image.id}`}
                className="album-image"
              />
              <FaPrint
                className={`status-icon ${image.printStatus ? 'checked' : 'unchecked'}`}
                onClick={() => handlePrintStatusToggle(image.id, image.printStatus)}
              />
            </div>
          ))}
        </div>
      )}

      {album.length > 0 && (
        <div className="floating-bar">
          <button onClick={selectAllImages} className="btn floating-btn">
            <FaCheckSquare /> {selectedImages.length === album.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
          </button>
          <button onClick={() => downloadImagesWithWatermark(selectedImages, watermark_setting, eventId)} className="btn floating-btn">
            <FaCloudDownloadAlt /> تحميل الصور المحددة 
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
              draggable="false" // يمنع سلوك السحب
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default ImageGrid;
