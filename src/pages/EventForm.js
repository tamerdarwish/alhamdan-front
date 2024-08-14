import React, { useState } from 'react';

const EventForm = () => {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    date: '',
    main_image: '',
    drive_link: '',
    access_code: '',
    album:[],
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

      // إذا تم اختيار صورة، قم برفعها إلى الخادم
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const uploadResponse = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          imageUrl = uploadData.url; // استلام الرابط من الخادم
        } else {
          alert('Failed to upload image: ' + uploadData.message);
          return;
        }
      }

      // حفظ تفاصيل المناسبة مع رابط الصورة
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...eventDetails, main_image: imageUrl }),
      });

      const data = await response.json();

      if (data.success) {
        // توجيه المستخدم إلى صفحة مناسبة أخرى بعد الحفظ الناجح
        window.location.href = '/admin';
      } else {
        alert('Failed to save event: ' + data.message);
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('An error occurred while saving the event.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>Create/Edit Event</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Event Name</label>
          <input
            type="text"
            value={eventDetails.name}
            onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
            placeholder="Enter event name"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Event Date</label>
          <input
            type="date"
            value={eventDetails.date}
            onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Google Drive Link</label>
          <input
            type="text"
            value={eventDetails.drive_link}
            onChange={(e) => setEventDetails({ ...eventDetails, drive_link: e.target.value })}
            placeholder="Enter Google Drive link"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Access Code</label>
          <input
            type="text"
            value={eventDetails.access_code}
            onChange={(e) => setEventDetails({ ...eventDetails, access_code: e.target.value })}
            placeholder="Enter Access Code"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Watermark Option</label>
          <select
            value={eventDetails.watermark_setting}
            onChange={(e) => setEventDetails({ ...eventDetails, watermark_setting: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="0">No Watermark</option>
            <option value="1">Partial Watermark</option>
            <option value="2">Full Watermark</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', fontSize: '16px' }}
        >
          Save Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
