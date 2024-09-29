import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap'; // استيراد شريط التقدم
import {
  fetchEvent,
  handleAddImages,
  handleSelectImage,
  handleDeleteImage,
  handleDeleteSelectedImages,
  handleEditClick,
  handleCancelEdit,
  handleChange,
  handleSaveChanges,
  handleSelectAllImages,
  handleDownloadZip
} from '../services/eventHandlers';
import './EventPage.css';
import ImageGrid from '../components/AdminImageGrid';
import EventInfo from '../components/AdminEventInfo'; // استيراد مكون EventInfo
import { checkAdminAuth } from '../utils/adminAuth';




const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // حالة لتخزين نسبة التقدم
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // التحقق من إذا ما كان الأدمن مسجلاً للدخول
    const isAdminAuthenticated = checkAdminAuth();
  
    // إذا لم يكن الأدمن مسجلاً للدخول، التوجيه لصفحة تسجيل الدخول
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchEvent(eventId, setEvent, setUpdatedEvent, setLoading);
  }, [eventId]);


  const handleAddImagesWithProgress = async (e) => {
    const progressUpdateInterval = 100; // تحديث التقدم كل 100 مللي ثانية
    const startTime = Date.now();
    
    await handleAddImages(e, eventId, event, setEvent, setUpdatedEvent, () => {
      // تحديث التقدم بناءً على الوقت المنقضي
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min(100, Math.floor((elapsed / progressUpdateInterval) * 100));
      setUploadProgress(progressPercent);
    });
    
    setUploading(false);
  };

  const { name, date, main_image, drive_link,watermark_setting, access_code, album } = event || {};

  if ( uploading) {
    return (
      <div className="loading">
        {loading && <div>Loading...</div>}
        {uploading && <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />}
      </div>
    );
  }

  if (!event) {
    return <div className="error">Event not found.</div>;
  }

  return (
    <div className="event-page">
      <EventInfo
        name={name}
        date={date}
        main_image={main_image}
        drive_link={drive_link}
        watermark_setting={watermark_setting}
        access_code={access_code}
        isEditing={isEditing}
        updatedEvent={updatedEvent}
        setUpdatedEvent={setUpdatedEvent}
        handleEditClick={handleEditClick}
        handleChange={handleChange}
        handleSaveChanges={handleSaveChanges}
        handleCancelEdit={handleCancelEdit}
        navigate={navigate}
        setIsEditing={setIsEditing}
        eventId={eventId}
        setEvent={setEvent}
        setLoading={setLoading}
      />
      <div className="event-page-album">
        <ImageGrid
          album={album}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          handleSelectImage={(image) => handleSelectImage(image, selectedImages, setSelectedImages)}
          handleDeleteImage={(imageId) => handleDeleteImage(imageId, eventId, event, setEvent, setUpdatedEvent, setLoading)}
          handleDeleteSelectedImages={() => handleDeleteSelectedImages(eventId, selectedImages, event, setEvent, setUpdatedEvent, setSelectedImages, setLoading)}
          handleDownloadSelected={() => handleDownloadZip(event,selectedImages)}
          handleSelectAllImages={() => handleSelectAllImages(selectedImages, album, setSelectedImages)}
          handleAddImages={handleAddImagesWithProgress} // تعديل هنا
        />
      </div>
    </div>
  );
};

export default EventPage;
