import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../services/products-api'; // استيراد الدوال الجديدة
import './EditProduct.css'; // استيراد ملف CSS
import Swal from 'sweetalert2'; // استيراد SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // استيراد CSS الخاص بـ SweetAlert2

const EditProduct = () => {
  const { id } = useParams(); // الحصول على معرف المنتج من عنوان URL
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // للاحتفاظ بالصورة الجديدة
  const [imagePreview, setImagePreview] = useState(''); // للاحتفاظ بمعاينة الصورة الجديدة
  const [existingImageUrl, setExistingImageUrl] = useState(''); // للاحتفاظ بالصورة الحالية
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // جلب بيانات المنتج عندما يتم تحميل المكون
    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(id);
        // تعيين البيانات في الحقول
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setExistingImageUrl(data.image_url); // حفظ الرابط الحالي للصورة
        setImagePreview(data.image_url); // تعيين معاينة الصورة الحالية
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // حفظ الصورة المختارة
      setImagePreview(URL.createObjectURL(file)); // تعيين رابط معاينة الصورة الجديدة
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image_url', existingImageUrl); // الصورة الحالية

    if (image) {
      formData.append('image', image); // إضافة الصورة الجديدة إذا تم اختيارها
    }

    try {
      await updateProduct(id, formData); // استخدام الدالة الجديدة
      setSuccessMessage('تم تعديل المنتج بنجاح!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/'); // إعادة توجيه إلى الصفحة الرئيسية أو صفحة المنتجات
      }, 2000);
    } catch (error) {
      console.error('Error updating product:', error);

      Swal.fire({
        icon: 'error',  // تحديد نوع الأيقونة (خطأ)
        title: 'حدث خطأ!',
        text: 'حدث خطأ أثناء تعديل معلومات المنتج. يرجى المحاولة مرة أخرى.',
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
    <div className="edit-product-container">
      <h2>تعديل المنتج</h2>
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
          <label>سعر المنتج:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>الصورة الحالية:</label>
          {imagePreview && (
            <div className="preview-image">
              <img src={imagePreview} alt="Preview" width="100" />
            </div>
          )}
        </div>
        <div>
          <label>صورة جديدة (اختياري)</label>
          <label htmlFor="image-upload" className="custom-file-upload">
            تحميل صورة جديدة
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">حفظ التغييرات</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default EditProduct;
