import React, { useState } from 'react';
import './EventForm.css'; // استيراد ملف الـ CSS

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    try {
      let imageUrl = '';

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const uploadResponse = await fetch('http://localhost:5005/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          imageUrl = uploadData.url;
        } else {
          alert('Failed to upload image: ' + uploadData.message);
          return;
        }
      }

      const response = await fetch('http://localhost:5005/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...eventDetails, main_image: imageUrl }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = '/admin/events';
      } else {
        alert('Failed to save event: ' + data.message);
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('An error occurred while saving the event.');
    }
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
          <label className="label">كود الوصول </label>
          <input
            type="text"
            value={eventDetails.access_code}
            onChange={(e) => setEventDetails({ ...eventDetails, access_code: e.target.value })}
            placeholder="قم بإختيار كود للزبون"
            className="input"
          />
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
          <label className="label">  إختر صورة رئيسية للمناسبة:</label>
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
