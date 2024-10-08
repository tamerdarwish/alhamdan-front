import React, { useState } from 'react';
import './AdminAudioCard.css'; // تأكد من إنشاء هذا الملف لاحقًا
import { updateAudio, deleteAudioById } from '../services/audios-api'; // تأكد من استيراد دالة الحذف

export default function AudioCard({ id, title, description, mainImage, url }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title,
    description,
    mainImage, // الصورة الأصلية
    url,
  });

  // دالة التعامل مع التغيير في المدخلات
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // دالة لتحديث الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        mainImage: URL.createObjectURL(file), // عرض الصورة الجديدة فورًا
        imageFile: file, // حفظ الملف المختار لرفعه لاحقًا
      });
    }
  };

  // دالة حفظ التعديلات
  const handleSave = async () => {
    try {
      const updatedData = new FormData();
      updatedData.append('title', formData.title);
      updatedData.append('description', formData.description);
      updatedData.append('url', formData.url);

      // إذا تم تغيير الصورة، نضيفها إلى البيانات
      if (formData.imageFile) {
        updatedData.append('mainImage', formData.imageFile); // رفع الملف
      }

      await updateAudio(id, updatedData); // إرسال البيانات المحدثة
      setIsEditing(false); // إخفاء النموذج بعد الحفظ
    } catch (error) {
      console.error('Error updating audio:', error);
    }
  };

  // دالة حذف الصوت
// دالة حذف الصوت
const handleDelete = async () => {
  try {
    await deleteAudioById(id); // استدعاء دالة الحذف
    window.location.reload(); // إعادة تحميل الصفحة
  } catch (error) {
    console.error('Error deleting audio:', error);
  }
};


  return (
    <div className="audio-card">
      {!isEditing ? (
        <>
          <img src={formData.mainImage} alt={formData.title} className="audio-card-image" />
          <div className="audio-card-content">
            <h3 className="audio-card-title">{formData.title}</h3>
            <p className="audio-card-description">{formData.description}</p>
            <p className="audio-card-url">{formData.url}</p>
            <button onClick={() => setIsEditing(true)}>تعديل</button> {/* زر التعديل */}
            <button onClick={handleDelete} className="delete-button">
              🗑️ {/* أيقونة سلة المهملات */}
            </button>
          </div>
        </>
      ) : (
        <div className="audio-card-edit-form">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="العنوان"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="الوصف"
          />
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="الرابط"
          />
          <input
            type="file"
            name="mainImage"
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'block', marginTop: '10px' }}
          />
          <button onClick={handleSave}>حفظ</button>
          <button onClick={() => setIsEditing(false)}>إلغاء</button>
        </div>
      )}
    </div>
  );
}
