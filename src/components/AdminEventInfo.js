import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import EditForm from './EditForm';
import './AdminEventInfo.css';
import { uploadMainImage } from '../services/images-api'; // تأكد من أن هذه الخدمة محدثة لدعم API الجديد

const EventInfo = ({
  name,
  date,
  main_image,
  drive_link,
  access_code,
  isEditing,
  updatedEvent,
  setUpdatedEvent,
  handleEditClick,
  handleChange,
  handleSaveChanges,
  handleCancelEdit,
  navigate,
  setIsEditing,
  eventId,
  setEvent,
  setLoading,
}) => {
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setImagePreview(URL.createObjectURL(file)); // إنشاء معاينة للصورة الجديدة
  };

  const handleImageUpload = async () => {
    if (newImage) {
      try {
        setLoading(true);
        const { url } = await uploadMainImage(eventId, newImage); // قم بتحميل الصورة إلى الخادم
        setUpdatedEvent((prevEvent) => ({ ...prevEvent, main_image: url }));
        setNewImage(null);
        setImagePreview(null);
        setLoading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="event-info">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <div className="image-container">
        {imagePreview ? (
          <img src={imagePreview} alt="New Preview" />
        ) : (
          main_image && <img src={main_image} alt={name} />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }} // لإخفاء عنصر اختيار الملف
          id="image-upload"
        />
        <label htmlFor="image-upload" className="upload-button">Change Image</label>
        {newImage && (
          <button onClick={handleImageUpload} className="upload-image-button">Upload</button>
        )}
      </div>
      <h1>{name}</h1>
      <p>{date}</p>
      {isEditing ? (
        <EditForm
          updatedEvent={updatedEvent}
          handleChange={(e) => handleChange(e, setUpdatedEvent)}
          handleSaveChanges={() =>
            handleSaveChanges(eventId, updatedEvent, setEvent, setUpdatedEvent, setIsEditing, setLoading)
          }
          handleCancelEdit={() => handleCancelEdit(setIsEditing, { name, date, main_image, drive_link, access_code }, setUpdatedEvent)}
        />
      ) : (
        <>
          <p>Access Code: {access_code}</p>
          <p>
            Drive Link: <a href={drive_link} target="_blank" rel="noopener noreferrer">{drive_link}</a>
          </p>
          <button className="edit-button" onClick={() => handleEditClick(setIsEditing)}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default EventInfo;
