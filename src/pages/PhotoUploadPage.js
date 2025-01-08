import React, { useState } from 'react';
import PhotoUpload from '../components/PhotoUpload';
import PhotoList from '../components/PhotoList';
import ClipLoader from 'react-spinners/ClipLoader'; // استيراد مؤشر التحميل
import './PhotoUploadPage.css';
import { uploadPhotos } from '../services/printsHandler';
import Swal from 'sweetalert2'; // استيراد SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // استيراد CSS الخاص بـ SweetAlert2
import emailjs from 'emailjs-com'; // استيراد مكتبة EmailJS


const PhotoUploadPage = () => {
  const [photos, setPhotos] = useState([]);
  const [photoDetails, setPhotoDetails] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // حالة للتوصيل
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

  const sendOrderEmail = () => {
    const templateParams = {
      fullName: customerName || "N/A",
      phoneNumber: customerPhoneNumber || "N/A",
      type: "طباعة",
      deliveryOption: deliveryMethod=='pickup'? 'توصيل الى العنوان' : 'الاستلام من المحل',
      address: customerAddress ,
    };
    
    

    // إرسال البريد الإلكتروني باستخدام EmailJS
    emailjs.send(
      'service_ihvyzoc',  // استبدل هذا بمعرف الخدمة الخاص بك
      'template_7s7e1e5',  // استبدل هذا بمعرف القالب الخاص بك
      templateParams,      // البيانات التي سيتم إرسالها في البريد الإلكتروني
      'IaJb0xFReGyDav1HH'       // استبدل هذا بمفتاح المستخدم الخاص بك
    )
    .then((response) => {
      console.log('تم إرسال البريد الإلكتروني بنجاح:', response);
    })
    .catch((error) => {
      console.error('حدث خطأ أثناء إرسال البريد الإلكتروني:', error);
    });
  };

  const handleSubmit = async () => {
    if (!customerName || !customerEmail || !deliveryMethod) {
      Swal.fire({
        icon: 'warning',
        title: 'تنبيه!',
        text: 'يرجى ملء جميع الحقول المطلوبة.',
        confirmButtonText: 'حسنًا',
        customClass: {
          title: 'swal2-title',
          content: 'swal2-content',
          confirmButton: 'swal2-confirm-button'
        }
      });
      return;
    }

    setIsLoading(true); // تعيين حالة التحميل إلى true عند بدء العملية

    try {
      const formData = new FormData();
      formData.append('customer_name', customerName);
      formData.append('customer_email', customerEmail);
      formData.append('address', customerAddress);
      formData.append('phone_number', customerPhoneNumber);
      formData.append('delivery_method', deliveryMethod); // إضافة خيار التوصيل

      photos.forEach((file, index) => {
        const filePath = `customer_photos/${customerEmail}/${file.name}`;
        formData.append('photos', file);
        formData.append('filePaths[]', filePath);
        formData.append('sizes[]', photoDetails[index].size);
        formData.append('copies[]', photoDetails[index].copies);
      });

      await uploadPhotos(formData);

      Swal.fire({
        icon: 'success',
        title: 'ممتاز!',
        text: 'تم إرسال الصور بنجاح.',
        confirmButtonText: 'حسنًا',
        customClass: {
          title: 'swal2-title',
          content: 'swal2-content',
          confirmButton: 'swal2-confirm-button'
        }
      });
      sendOrderEmail()
      setPhotos([]);
      setPhotoDetails([]);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerAddress('');
      setCustomerPhoneNumber('');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ!',
        text: 'حدث خطأ أثناء محاولة رفع الصور. يرجى المحاولة مرة أخرى.',
        confirmButtonText: 'حسنًا',
        customClass: {
          title: 'swal2-title',
          content: 'swal2-content',
          confirmButton: 'swal2-confirm-button'
        }
      });
    } finally {
      setIsLoading(false); // تعيين حالة التحميل إلى false بعد انتهاء العملية
    }
  };

  return (
    <div className="photo-upload-page-container">
      <h2 className='photo-upload-page-title'>رفع الصور للطباعة</h2>
      <input
        type="text"
        placeholder="اسم العميل"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
        className='photo-upload-input'
      />
      <input
        type="text"
        placeholder="العنوان الكامل"
        value={customerAddress}
        onChange={(e) => setCustomerAddress(e.target.value)}
        required
        className='photo-upload-input'
      />
      <input
        type="tel"
        placeholder="رقم الهاتف"
        value={customerPhoneNumber}
        onChange={(e) => setCustomerPhoneNumber(e.target.value)}
        required
        className='photo-upload-input'
      />
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        required
        className='photo-upload-input'
      />

      {/* إضافة خيار التوصيل */}
      <label htmlFor="delivery-method">طريقة الاستلام:</label>
      <select
        id="delivery-method"
        value={deliveryMethod}
        onChange={(e) => setDeliveryMethod(e.target.value)}
        className='photo-upload-select'
        required
      >
        <option value="pickup">الاستلام من المحل</option>
        <option value="delivery">التوصيل إلى العنوان</option>
      </select>

      <PhotoUpload onUpload={handleUpload} />
      <PhotoList
        photos={photos}
        photoDetails={photoDetails}
        onSizeChange={handleSizeChange}
        onCopiesChange={handleCopiesChange}
      />

      {/* مؤشر التحميل مع زر الرفع */}
      <button onClick={handleSubmit} className='photo-upload-submit-button' disabled={isLoading}>
        {isLoading ? (
          <div className="loading-indicator-container">
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
