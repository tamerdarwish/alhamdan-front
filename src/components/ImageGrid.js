import React, { useState } from 'react';
import { FaPrint, FaCheckSquare, FaCloudDownloadAlt, FaCheck, FaMinus, FaPlus, FaTimes, FaCheckCircle, FaRegCheckCircle, FaCopy  } from 'react-icons/fa';
import Modal from 'react-modal';
import { MdPrint } from "react-icons/md";
import { IoIosRadioButtonOff,IoIosRadioButtonOn  } from "react-icons/io";


import './ImageGrid.css';
import InputNumber from './InputNumber';  // استيراد مكون InputNumber
import { downloadImagesWithWatermark, updateCopies } from '../services/images-api';

Modal.setAppElement('#root');

const ImageGrid = ({ album, handlePrintStatusToggle, watermark_setting, eventId, setAlbum }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [copyCount, setCopyCount] = useState({});  // حفظ عدد النسخ لكل صورة

  // Handle image selection
  const handleImageClick = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter(img => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  // Update copies for an image
  const handleUpdateCopies = async (id, newCopies) => {
    const image = album.find((img) => img.id === id);
    if (!image) return;

    try {
      const response = await updateCopies(eventId, id, newCopies);
      if (response.success) {
        const updatedAlbum = response.data.album.map((image) => JSON.parse(image));
        setAlbum(updatedAlbum);
      } else {
        console.error('Failed to update copies:', response);
      }
    } catch (error) {
      console.error('Failed to update copies:', error);
    }
  };

  // Increase or decrease copies count
  const handleCopyChange = (id, change) => {
    setCopyCount((prev) => {
      const newCount = (prev[id] || 1) + change;
      return { ...prev, [id]: newCount <= 0 ? 1 : newCount };
    });
  };

  // Close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Select or deselect all images
  const selectAllImages = () => {
    if (selectedImages.length === album.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(album);
    }
  };

  // Prevent context menu on right-click
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  // Count printed images
  const printedImagesCount = album.filter(image => image.printStatus).length;

  return (
    <div className="album-section">
      <h2 className="album-title">ألبوم الصور</h2>
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-label">إجمالي الصور:</span>
          <span className="stat-value">{album.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">الصور المحددة:</span>
          <span className="stat-value">{selectedImages.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">الصور المطبوعة:</span>
          <span className="stat-value">{printedImagesCount}</span>
        </div>
      </div>
  
      {album.length === 0 ? (
        <p className="no-images">الألبوم فارغ.</p>
      ) : (
        <div className="images-grid">
          {album.map((image) => (
            <div
              key={image.id}
              className={`image-container ${selectedImages.includes(image) ? 'selected' : ''}`}
              onContextMenu={handleContextMenu}
              draggable="false"
            >
              <div className="image-overlay">
                {/* زر التحديد في أعلى الصورة */}
                <button
                  onClick={() => handleImageClick(image)}
                  className={`select-button ${selectedImages.includes(image) ? 'selected' : ''}`}
                  title={selectedImages.includes(image) ? 'إلغاء تحديد' : 'تحديد'}
                >
                  {selectedImages.includes(image) ? <IoIosRadioButtonOn  /> : <IoIosRadioButtonOff />}
                </button>
              </div>
  
              <img
                src={image.url}
                alt={`Album image ${image.id}`}
                className="album-image"
                onClick={() => setSelectedImage(image)}
              />
  
              <div className="image-info">
                {/* زر الطباعة مع إمكانية تعديل عدد النسخ */}
                <div className="print-info">
                  <MdPrint
                    style={{
                      backgroundColor: image.printStatus ? 'green' : 'rgba(73, 73, 73, 0.534)',
                      color: 'white',
                    }}
                    className="status-icon"
                    onClick={() => handlePrintStatusToggle(image.id, image.printStatus)}
                  />
                  {image.printStatus && (
                    <div className="copies-container">
                      <span className='copies-title'>عدد النسخ </span>
                      <div className="copies-inner-container">
                        <button onClick={() => handleCopyChange(image.id, -1)}><FaMinus /></button>
                        <span>{copyCount[image.id] || 1}</span>
                        <button onClick={() => handleCopyChange(image.id, 1)}><FaPlus /></button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
  
      {album.length > 0 && (
        <div className="floating-bar">
          <button onClick={selectAllImages} className="btn floating-btn">
            <FaCheckSquare /> {selectedImages.length === album.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
          </button>
          <button
            onClick={() => downloadImagesWithWatermark(selectedImages, watermark_setting, eventId)}
            className="btn floating-btn primary"
          >
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
          <div className="modal-inner">
            <button className="close-button" onClick={closeModal}>
              <FaTimes />
            </button>
            <img
              src={selectedImage.url}
              alt={`Selected image ${selectedImage.id}`}
              className="modal-image"
              onContextMenu={handleContextMenu}
              draggable="false"
            />
          </div>
        )}
      </Modal>
    </div>
  );
  
};

export default ImageGrid;
