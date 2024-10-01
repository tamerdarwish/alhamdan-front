import React, { useState } from 'react';
import './EventForm.css'; // استيراد ملف الـ CSS
import { uploadImage, saveEvent  } from '../services/images-api'; // استيراد الدوال الخارجية
import { checkAccessCode } from '../services/events-api'; // استيراد دالة التحقق من كود الوصول
import Swal from 'sweetalert2'; // استيراد SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // استيراد CSS الخاص بـ SweetAlert2

const EventForm = () => {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    date: '',
    main_image: '',
    drive_link: '',
    access_code: '',
    album: [],
    watermark_setting: 'none',
  });

  const [imageFile, setImageFile] = useState(null);

  // دالة واحدة لتوليد كود وصول فريد
  const generateUniqueAccessCode = async () => {
    let accessCode;
    let isUnique = false;

    while (!isUnique) {
      // توليد كود وصول عشوائي
      accessCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // تحقق من قاعدة البيانات للتأكد من أن الكود غير مستخدم
      const exists = await checkAccessCode(accessCode);
      if (!exists) {
        isUnique = true; // إذا كان الكود فريدًا
      }
    }

    return accessCode;
  };

  
  // دالة التعامل مع تغيير الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // دالة حفظ المناسبة
  const handleSave = async () => {
    try {
      let imageUrl = '';

      if (imageFile) {
        imageUrl = await uploadImage(imageFile); // استدعاء دالة رفع الصورة
      }

      // إذا كان كود الوصول فارغًا، نقوم بإنشاء كود عشوائي فريد
      if (!eventDetails.access_code) {
        const uniqueCode = await generateUniqueAccessCode();
        setEventDetails((prevDetails) => ({ ...prevDetails, access_code: uniqueCode }));
      }

      const eventData = { ...eventDetails, main_image: imageUrl };
      await saveEvent(eventData); // استدعاء دالة حفظ المناسبة
      window.location.href = '/admin/events';
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',  // تحديد نوع الأيقونة (خطأ)
        title: 'حدث خطأ!',
        text: 'حدث خطأ أثناء حفظ المناسبة. يرجى المحاولة مرة أخرى.',
        confirmButtonText: 'حسنًا',
        customClass: {
          title: 'swal2-title',   // فئات مخصصة للعنوان
          content: 'swal2-content',  // فئات مخصصة للنص
          confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
        }
      });
    }
  };

  // دالة توليد الكود عند الضغط على الزر
  const handleGenerateCode = async () => {
    const uniqueCode = await generateUniqueAccessCode();
    setEventDetails((prevDetails) => ({ ...prevDetails, access_code: uniqueCode }));
   
  };

  return (
    <div className="container">
      <h1>إنشاء مناسبة جديدة</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div className="form-group">
          <label className="label">عنوان المناسبة</label>
          <input
            type="text"
            value={eventDetails.name}
            onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
            placeholder="أدخل عنوان المناسبة"
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">تاريخ المناسبة</label>
          <input
            type="date"
            value={eventDetails.date}
            onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">رابط الفيديوهات</label>
          <input
            type="text"
            value={eventDetails.drive_link}
            onChange={(e) => setEventDetails({ ...eventDetails, drive_link: e.target.value })}
            placeholder="أدخل رابط فيديوهات المناسبة"
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">كود الوصول</label>
          <div className="access-code-container">
            <input
              type="text"
              value={eventDetails.access_code}
              onChange={(e) => setEventDetails({ ...eventDetails, access_code: e.target.value })}
              placeholder="قم بإختيار كود للزبون أو سيتم إنشاء كود تلقائي"
              className="input"
            />
            <button type="button" className="generate-code-button" onClick={handleGenerateCode}>
              توليد كود تلقائي
            </button>
          </div>
        </div>
        <div className="form-group">
          <label className="label">خيارات العلامة المائية</label>
          <select
            value={eventDetails.watermark_setting}
            onChange={(e) => setEventDetails({ ...eventDetails, watermark_setting: e.target.value })}
            className="select"
          >
            <option value="بدون علامة مائية">بدون علامة مائية</option>
            <option value="علامة مائية جزئية">علامة مائية جزئية</option>
            <option value="علامة مائية كاملة">علامة مائية كاملة</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label">إختر صورة رئيسية للمناسبة:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input"
          />
        </div>
        <button type="submit" className="button">
          حفظ المناسبة
        </button>
      </form>
    </div>
  );
};

export default EventForm;
