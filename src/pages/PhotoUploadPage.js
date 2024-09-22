// src/pages/PhotoUploadPage.js
import React, { useState } from 'react';
import PhotoUpload from '../components/PhotoUpload';
import PhotoList from '../components/PhotoList';
import './PhotoUploadPage.css';

const PhotoUploadPage = () => {
  const [photos, setPhotos] = useState([]);
  const [photoDetails, setPhotoDetails] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');



  const handleUpload = (uploadedPhotos) => {
    setPhotos(uploadedPhotos);
    setPhotoDetails(uploadedPhotos.map(() => ({ size: '10x15', copies: 1 }))); // تعيين حجم افتراضي
  };

  const handleSizeChange = (index, newSize) => {
    const updatedDetails = [...photoDetails];
    updatedDetails[index].size = newSize;
    setPhotoDetails(updatedDetails);
  };

  const handleCopiesChange = (index, newCopies) => {
    const updatedDetails = [...photoDetails];
    updatedDetails[index].copies = newCopies;
    setPhotoDetails(updatedDetails);
  };

  const handleSubmit = async () => {
    if (!customerName || !customerEmail) {
      alert('يرجى ملء جميع المعلومات المطلوبة');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('customer_name', customerName);
      formData.append('customer_email', customerEmail);
      formData.append('customer_address', customerAddress);
      formData.append('customer_phone_number', customerPhoneNumber);



      photos.forEach((file, index) => {
        const filePath = `customer_photos/${customerEmail}/${file.name}`;
        formData.append('photos', file);
        formData.append('filePaths[]', filePath);
        formData.append('sizes[]', photoDetails[index].size);
        formData.append('copies[]', photoDetails[index].copies);
      });

      const response = await fetch('http://localhost:5005/api/print/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('فشل رفع الصور');
      }

      alert('تم رفع الصور بنجاح');
      setPhotos([]);
      setPhotoDetails([]);
      setCustomerName('');
      setCustomerEmail('');
    } catch (error) {
      console.error('Error:', error);
      alert('خطأ في رفع الصور');
    }
  };

  return (
    <div className="photo-upload-page">
      <h2>رفع الصور للطباعة</h2>
      <input
        type="text"
        placeholder="اسم العميل"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required // جعل الحقل مطلوب
        className='form-input'

      />
        <input
        type="text"
        placeholder=" العنوان الكامل"
        value={customerAddress}
        onChange={(e) => setCustomerAddress(e.target.value)}
        required // جعل الحقل مطلوب
        className='form-input'
      />
      <input
        type="tel"
        placeholder="رقم الهاتف"
        value={customerAddress}
        onChange={(e) => setCustomerPhoneNumber(e.target.value)}
        required // جعل الحقل مطلوب
        className='form-input'
      />
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        required // جعل الحقل مطلوب
        className='form-input'
      />
      <PhotoUpload onUpload={handleUpload} />
      <PhotoList
        photos={photos}
        photoDetails={photoDetails}
        onSizeChange={handleSizeChange}
        onCopiesChange={handleCopiesChange}
      />
      <button onClick={handleSubmit} className='submit-button'>رفع الصور</button>
    </div>
  );
};

export default PhotoUploadPage;
