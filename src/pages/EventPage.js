import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTrash, FaSave ,FaCheck} from 'react-icons/fa';
import './EventPage.css'; // إضافة ملف CSS خارجي

import imageCompression from 'browser-image-compression';


const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        const data = await response.json();
        if (Array.isArray(data.album)) {
          data.album = data.album.map(image => JSON.parse(image));
        }

        setEvent(data);
        setUpdatedEvent(data); // إعداد تفاصيل الحدث للتعديل
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch event:', error);
        alert('Failed to fetch event');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);


  const handleAddImages = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
        alert('Please select image files');
        return;
    }

    const compressOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true
    };

    for (const file of files) {
        try {
            // ضغط الصورة
            const compressedFile = await imageCompression(file, compressOptions);

            // إعداد البيانات لإرسالها
            const formData = new FormData();
            formData.append('images', compressedFile);

            // رفع الصورة
            const response = await fetch(`http://localhost:5000/api/upload/${eventId}/add-images`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const { album: newAlbum } = await response.json();

            // تحديث الألبوم بعد رفع الصورة بنجاح
            const uniqueImages = Array.from(new Set([...event.album, ...newAlbum]));
            setEvent(prevEvent => ({
                ...prevEvent,
                album: uniqueImages,
            }));

        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        }
    }
};

  
  const handleSelectImage = (imageUrl) => {
    if (selectedImages.includes(imageUrl)) {
      setSelectedImages(selectedImages.filter((img) => img !== imageUrl));
    } else {
      setSelectedImages([...selectedImages, imageUrl]);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
  
    // تحديث الألبوم مباشرة قبل انتظار الاستجابة
    const updatedAlbum = event.album.filter((img) => img.id !== imageId);
  
    setEvent(prevEvent => ({
      ...prevEvent,
      album: updatedAlbum,
    }));
  
    try {
      const response = await fetch(`http://localhost:5000/api/upload/${eventId}/delete-image`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageId }) // إرسال الرقم التعريفي في الجسم
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete image');
      }
  
      // لا حاجة للحصول على updatedAlbum من الاستجابة حيث تم تحديثه مسبقًا
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
  
      // إذا حدث خطأ، يمكن إعادة الصورة المحذوفة إلى الألبوم
      setEvent(prevEvent => ({
        ...prevEvent,
        album: [...prevEvent.album, event.album.find(img => img.id === imageId)],
      }));
    }
  };
  

  const handleDeleteSelectedImages = async () => {
    if (!window.confirm('Are you sure you want to delete selected images?')) return;
  
    try {
      // تحديث الألبوم مباشرة قبل انتظار الاستجابة
      const updatedAlbum = event.album.filter((img) => !selectedImages.includes(img));
      setEvent(prevEvent => ({
        ...prevEvent,
        album: updatedAlbum,
      }));
  
      // إرسال طلب الحذف
      const response = await fetch(`http://localhost:5000/api/upload/${eventId}/delete-images`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ images: selectedImages })
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete images');
      }
  
      // إعادة تعيين الصور المحددة بعد الحذف
      setSelectedImages([]);
    } catch (error) {
      console.error('Error deleting images:', error);
      alert('Failed to delete images');
      // إذا حدث خطأ، يمكن إرجاع الحالة الأصلية للألبوم إذا لزم الأمر
      setEvent(prevEvent => ({
        ...prevEvent,
        album: [...prevEvent.album, ...selectedImages],
      }));
    }
  };
  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedEvent(event); // إعادة تعيين القيم الأصلية
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent(prevEvent => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    // تحديث الواجهة مباشرةً بقيم التحديث
    setEvent(prevEvent => ({
        ...prevEvent,
        ...updatedEvent,
    }));
    
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      const data = await response.json();
      // تحديث الحالة النهائية بعد تأكيد العملية من الخادم
      setEvent(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
      
      // في حالة الخطأ، إعادة الحالة إلى قيمتها الأصلية
      setEvent(prevEvent => ({
          ...prevEvent,
          ...event, // إعادة القيم الأصلية
      }));
    } finally {
      setLoading(false);
    }
};

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!event) {
    return <div className="error">Event not found.</div>;
  }

  const { name, date, main_image, drive_link, access_code, album } = event;

  return (
    <div className="event-page">
      <div className="event-page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h1>{name}</h1>
      </div>

      {isEditing ? (
        <div className="edit-form">
          <label>
            Event Name:
            <input
              type="text"
              name="name"
              value={updatedEvent.name || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={updatedEvent.date || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Main Image URL:
            <input
              type="text"
              name="main_image"
              value={updatedEvent.main_image || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Drive Link:
            <input
              type="text"
              name="drive_link"
              value={updatedEvent.drive_link || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Access Code:
            <input
              type="text"
              name="access_code"
              value={updatedEvent.access_code || ''}
              onChange={handleChange}
            />
          </label>
          <button className="save-button" onClick={handleSaveChanges}>
            <FaSave /> Save Changes
          </button>
          <button className="cancel-button" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="main-image-container">
            {main_image && <img src={main_image} alt={name} className="main-image" />}
          </div>
          <div className="event-details">
            <p><strong>Date:</strong> {date}</p>
            {drive_link && <a href={drive_link} target="_blank" rel="noopener noreferrer" className="drive-link">View Drive Link</a>}
            {access_code && <p><strong>Access Code:</strong> {access_code}</p>}
            <button className="edit-button" onClick={handleEditClick}>
              Edit Event
            </button>
          </div>
        </>
      )}

<div className="album-section">
  <h2>Album</h2>
  <div className="upload-container">
    <label htmlFor="file-upload" className="upload-button">
      <FaPlus /> Upload Images
    </label>
    <input
      id="file-upload"
      type="file"
      accept="image/*"
      multiple
      onChange={handleAddImages}
      className="file-input"
    />
  </div>

  {album.length === 0 ? (
    <p className="no-images">No images in the album.</p>
  ) : (
    <div className="images-grid">
      {album.map((image, index) => (
        <div key={index} className="image-container">
          <img src={image.url} alt={`Album image ${index + 1}`} className="album-image" />
          
          <input
            type="checkbox"
            className="select-checkbox"
            checked={selectedImages.includes(image)}
            onChange={() => handleSelectImage(image)}
          />
          
          <button
            className="delete-button"
            onClick={() => handleDeleteImage(image.id)}
          >
            <FaTrash />
          </button>
          
          {/* أيقونة "صح" بناءً على printStatus */}
          <FaCheck
            className={`status-icon ${image.printStatus ? 'checked' : 'unchecked'}`}
          />
        </div>
      ))}
    </div>
  )}

  <button
    className="delete-selected-button"
    onClick={handleDeleteSelectedImages}
  >
    Delete Selected Images
  </button>
</div>

    </div>
  );
};

export default EventPage;
