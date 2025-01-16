import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { checkAdminAuth } from '../utils/adminAuth';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../services/products-api'; // استيراد دالة إضافة المنتج

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // State لتحميل الصورة
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const isAdminAuthenticated = checkAdminAuth();

    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // حفظ الصورة المختارة
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من الحقول الفارغة
    if (!name) {
      setErrorMessage('إسم المنتج هذا الحقل مطلوب.');
      return;
    } else if (!description) {
      setErrorMessage('وصف المنتج هذا الحقل مطلوب.');
      return;
    } else if (!price) {
      setErrorMessage('سعر المنتج هذا الحقل مطلوب.');
      return;
    } 
    else if (!image) {
      setErrorMessage('الصورة المختارة: هذا الحقل مطلوب.');
      return;
    }
    else {
      setErrorMessage('');
    }

    // إعداد بيانات النموذج للرفع
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await addProduct(formData);
      Swal.fire('تم إضافة المنتج بنجاح!', '', 'success');

      setTimeout(() => {
        setName('');
        setDescription('');
        setPrice('');
        setImage(null);
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ!',
        text: 'حدث خطأ أثناء إضافة المنتج. يرجى المحاولة مرة أخرى.',
      });
    }
  };

  return (
    <div className="add-product-container">
      <h2>إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">إسم المنتج</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">وصف المنتج</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">سعر المنتج</label>
          <input
            id="price"
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
        <button type="submit">إضافة المنتج</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddProduct;
