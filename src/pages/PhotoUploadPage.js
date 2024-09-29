import React, { useState } from 'react';
import PhotoUpload from '../components/PhotoUpload';
import PhotoList from '../components/PhotoList';
import ClipLoader from 'react-spinners/ClipLoader'; // استيراد مؤشر التحميل
import './PhotoUploadPage.css';
import {uploadPhotos} from '../services/printsHandler'
import Swal from 'sweetalert2'; // استيراد SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // استيراد CSS الخاص بـ SweetAlert2

const PhotoUploadPage = () => {
  const [photos, setPhotos] = useState([]);
  const [photoDetails, setPhotoDetails] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل

  const handleUpload = (uploadedPhotos) => {
    setPhotos(uploadedPhotos);
    setPhotoDetails(uploadedPhotos.map(() => ({ size: '10x15', copies: 1 })));
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
      Swal.fire({
        icon: 'warning',  // تحديد نوع الأيقونة (خطأ)
        title: 'تنبيه!',
        text: 'يرجى ملء جميع الحقول المطلوبة.',
        confirmButtonText: 'حسنًا',
        customClass: {
          title: 'swal2-title',   // فئات مخصصة للعنوان
          content: 'swal2-content',  // فئات مخصصة للنص
          confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
        }
      });        return;
    }

    setIsLoading(true); // تعيين حالة التحميل إلى true عند بدء العملية

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

      await uploadPhotos(formData)

      Swal.fire({
        icon: 'success',  // تحديد نوع الأيقونة (خطأ)
        title: 'ممتاز!',
        text: 'تم إرسال الصور بنجاح.',
        confirmButtonText: 'حسنًا',
        customClass: {
          title: 'swal2-title',   // فئات مخصصة للعنوان
          content: 'swal2-content',  // فئات مخصصة للنص
          confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
        }
      });        setPhotos([]);
      setPhotoDetails([]);
      setCustomerName('');
      setCustomerEmail('');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',  // تحديد نوع الأيقونة (خطأ)
        title: 'حدث خطأ!',
        text: 'حدث خطأ أثناء محاولة رفع الصور. يرجى المحاولة مرة أخرى.',
        confirmButtonText: 'حسنًا',
        customClass: {
          title: 'swal2-title',   // فئات مخصصة للعنوان
          content: 'swal2-content',  // فئات مخصصة للنص
          confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
        }
      });      } finally {
      setIsLoading(false); // تعيين حالة التحميل إلى false بعد انتهاء العملية
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
        required
        className='form-input'
      />
      <input
        type="text"
        placeholder="العنوان الكامل"
        value={customerAddress}
        onChange={(e) => setCustomerAddress(e.target.value)}
        required
        className='form-input'
      />
      <input
        type="tel"
        placeholder="رقم الهاتف"
        value={customerPhoneNumber}
        onChange={(e) => setCustomerPhoneNumber(e.target.value)}
        required
        className='form-input'
      />
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        required
        className='form-input'
      />
      <PhotoUpload onUpload={handleUpload} />
      <PhotoList
        photos={photos}
        photoDetails={photoDetails}
        onSizeChange={handleSizeChange}
        onCopiesChange={handleCopiesChange}
      />

      {/* مؤشر التحميل مع زر الرفع */}
      <button onClick={handleSubmit} className='submit-button' disabled={isLoading}>
        {isLoading ? (
          <div className="loading-indicator">
            <ClipLoader color={"#ffffff"} loading={isLoading} size={20} /> {/* مؤشر التحميل */}
            <span>جاري رفع الصور...</span>
          </div>
        ) : (
          'رفع الصور'
        )}
      </button>
    </div>
  );
};

export default PhotoUploadPage;
