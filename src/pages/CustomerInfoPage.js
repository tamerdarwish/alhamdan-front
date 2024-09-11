import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const CustomerInfoPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { images, imageDetails } = location.state || { images: [], imageDetails: [] }; // التحقق من وجود البيانات أو تعيين مصفوفات فارغة

  const handleSubmit = async () => {
    if (!images || !images.length) {
      console.error('No images provided');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('customer_name', customerName);
      formData.append('customer_email', customerEmail);

      // تحويل Blob URLs إلى ملفات فعلية
      for (const [index, url] of images.entries()) {
        const response = await fetch(url);
        const blob = await response.blob();
        formData.append('photos[]', blob, `photo_${index}.jpg`);
        formData.append('sizes[]', imageDetails[index].size);
        formData.append('copies[]', imageDetails[index].quantity);
      }

      const response = await fetch('http://localhost:5005/api/print/photos', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save photos');
      }

      navigate('/confirmation');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  
  return (
    <div className="customer-info-page">
      <h1>معلومات الزبون</h1>
      <form>
        <label>
          الاسم:
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </label>
        <label>
          البريد الإلكتروني:
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
        </label>
        <button type="button" onClick={handleSubmit}>تأكيد</button>
      </form>
    </div>
  );
};

export default CustomerInfoPage;
