import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoUploadButton from '../components/PhotoUploadButton';
import ImageCard from '../components/ImageCard';
import './PhotoPrintPage.css';

const PhotoPrintPage = () => {
  const [images, setImages] = useState([]);
  const [imageDetails, setImageDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // تنظيف الـ URLs عند تغيير الصور
    return () => {
      images.forEach(image => URL.revokeObjectURL(image));
    };
  }, [images]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.map(file => URL.createObjectURL(file));
    const newDetails = files.map(() => ({
      size: '10x15', // Default size
      quantity: 1 // Default quantity
    }));
    setImages(prevImages => [...prevImages, ...imageFiles]);
    setImageDetails(prevDetails => [...prevDetails, ...newDetails]);
  };

  const handleRemoveImage = (index) => {
    // تنظيف الـ URL عند إزالة الصورة
    URL.revokeObjectURL(images[index]);
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setImageDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
  };

  const handleSizeChange = (index, size) => {
    const updatedDetails = [...imageDetails];
    updatedDetails[index].size = size;
    setImageDetails(updatedDetails);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedDetails = [...imageDetails];
    updatedDetails[index].quantity = quantity;
    setImageDetails(updatedDetails);
  };

  const handleConfirmPrint = () => {
    // تمرير البيانات باستخدام state
    navigate('/customer-info', { state: { images, imageDetails } });
  };

  return (
    <div className="photo-print-page">
      <h1>طباعة الصور</h1>
      <PhotoUploadButton onClick={() => document.getElementById('file-input').click()} />
      <input
        id="file-input"
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <div className="image-cards-container">
        {images.map((image, index) => (
          <ImageCard
            key={index}
            image={image}
            size={imageDetails[index].size}
            quantity={imageDetails[index].quantity}
            onSizeChange={(size) => handleSizeChange(index, size)}
            onQuantityChange={(quantity) => handleQuantityChange(index, quantity)}
            onRemove={() => handleRemoveImage(index)}
          />
        ))}
      </div>
      <button className="confirm-button" onClick={handleConfirmPrint}>تأكيد الطباعة</button>
    </div>
  );
};

export default PhotoPrintPage;
