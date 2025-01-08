import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import Swal from 'sweetalert2'; // استيراد SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // استيراد CSS الخاص بـ SweetAlert2
import { checkAdminAuth } from '../utils/adminAuth';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../services/products-api'; // استيراد الدالة

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // State to hold the selected image
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  
  useEffect(() => {
    // التحقق من إذا ما كان الأدمن مسجلاً للدخول
    const isAdminAuthenticated = checkAdminAuth();

    // إذا لم يكن الأدمن مسجلاً للدخول، التوجيه لصفحة تسجيل الدخول
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // حفظ الصورة المختارة في الـ state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // إنشاء FormData للتعامل مع رفع الملفات
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
   // formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await addProduct(formData); // استدعاء الدالة الخارجية
      setSuccessMessage('تم إضافة المنتج بنجاح!');

      // إعادة تعيين الحقول بعد النجاح
      setTimeout(() => {
        setName('');
        setDescription('');
        setPrice('');
        setImage(null); // إعادة تعيين الصورة
        setSuccessMessage(''); // مسح رسالة النجاح
        window.location.reload(); // إعادة تحميل الصفحة
      }, 1000); // 1 ثانية لمطابقة مدة العرض
    } catch (error) {
      // استبدال alert التقليدية بـ SweetAlert2
      Swal.fire({
        icon: 'error',  // تحديد نوع الأيقونة (خطأ)
        title: 'حدث خطأ!',
        text: 'حدث خطأ أثناء إضافة المنتج. يرجى المحاولة مرة أخرى.',
        confirmButtonText: 'حسنًا',
        customClass: {
          title: 'swal2-title',   // فئات مخصصة للعنوان
          content: 'swal2-content',  // فئات مخصصة للنص
          confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
        }
      });
    }
  };

  return (
    <div className="add-product-container">
      <h2>إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>إسم المنتج</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>وصف المنتج</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>سعر المنتج</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <div className="image-upload">
            <label htmlFor="image">إضغط لاختيار صورة</label>
            <input 
              id="image" 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              required 
              name="image" 
            />
          </div>
          {image && (
            <div className="selected-image">
              <p>الصورة المختارة:</p>
              <img 
                src={URL.createObjectURL(image)} 
                alt="Selected" 
                className="thumbnail-image" 
              />
            </div>
          )}
        </div>
        <button type="submit">إضافة المنتج </button>
      </form>
      {successMessage && (
        <p className="success-message">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default AddProduct;
