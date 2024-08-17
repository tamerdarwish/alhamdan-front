import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTrash, FaSave, FaCheck, FaPrint } from 'react-icons/fa';
import { fetchEventById, editEvent } from '../services/events-api';
import { uploadImageToAlbum, deleteImageFromAlbum, deleteSelectedImagesFromAlbum } from '../services/images-api';
import './EventPage.css'; // إضافة ملف CSS خارجي
import imageCompression from 'browser-image-compression';
import ImageUploader from '../components/ImageUploader';
import ImageGrid from '../components/ImageGrid';
import EditForm from '../components/EditForm';

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const navigate = useNavigate();

  // Fetch the event details initially
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await fetchEventById(eventId);
        if (Array.isArray(eventData.album)) {
          eventData.album = eventData.album.map(image => JSON.parse(image));
        }
        setEvent(eventData);
        setUpdatedEvent(eventData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch event:', error);
        alert('Failed to fetch event');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  // Refetch event when updatedEvent changes
  useEffect(() => {
    const refetchEvent = async () => {
      if (updatedEvent && updatedEvent.id) {
        try {
          const updatedEventData = await fetchEventById(updatedEvent.id);
          if (Array.isArray(updatedEventData.album)) {
            updatedEventData.album = updatedEventData.album.map(image => JSON.parse(image));
          }
          setEvent(updatedEventData);
          setSelectedImages([]);
        } catch (error) {
          console.error('Failed to fetch updated event:', error);
          alert('Failed to fetch updated event');
        }
      }
    };

    refetchEvent();
  }, [updatedEvent]);

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

    const newImages = [];

    for (const file of files) {
      try {
        const compressedFile = await imageCompression(file, compressOptions);
        const formData = new FormData();
        formData.append('images', compressedFile);

        const { album: newAlbum } = await uploadImageToAlbum(eventId, formData);
        newImages.push(...newAlbum);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    }

    if (newImages.length > 0) {
      const updatedAlbum = [...event.album, ...newImages];
      setEvent(prevEvent => ({
        ...prevEvent,
        album: updatedAlbum,
      }));
      setUpdatedEvent(prevEvent => ({
        ...prevEvent,
        album: updatedAlbum,
      }));
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

    const updatedAlbum = event.album.filter((img) => img.id !== imageId);
    setEvent(prevEvent => ({
      ...prevEvent,
      album: updatedAlbum,
    }));
    setUpdatedEvent(prevEvent => ({
      ...prevEvent,
      album: updatedAlbum,
    }));

    try {
      await deleteImageFromAlbum(eventId, imageId);
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
      setEvent(prevEvent => ({
        ...prevEvent,
        album: [...prevEvent.album, event.album.find(img => img.id === imageId)],
      }));
      setUpdatedEvent(prevEvent => ({
        ...prevEvent,
        album: [...prevEvent.album, event.album.find(img => img.id === imageId)],
      }));
    }
  };

  const handleDeleteSelectedImages = async () => {
    if (!window.confirm('Are you sure you want to delete selected images?')) return;

    try {
      const updatedAlbum = event.album.filter((img) => !selectedImages.includes(img));
      setEvent(prevEvent => ({
        ...prevEvent,
        album: updatedAlbum,
      }));
      setUpdatedEvent(prevEvent => ({
        ...prevEvent,
        album: updatedAlbum,
      }));

      await deleteSelectedImagesFromAlbum(eventId, selectedImages);
      setSelectedImages([]);
    } catch (error) {
      console.error('Error deleting images:', error);
      alert('Failed to delete images');
      setEvent(prevEvent => ({
        ...prevEvent,
        album: [...prevEvent.album, ...selectedImages],
      }));
      setUpdatedEvent(prevEvent => ({
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
    setUpdatedEvent(event);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent(prevEvent => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const data = await editEvent(eventId, updatedEvent);
      setEvent(data);
      setUpdatedEvent(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
      setUpdatedEvent(event);
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

  function handlePrintSelected() {
    if (selectedImages.length === 0) {
      alert("No images selected for printing.");
      return;
    }

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Images</title>');
    printWindow.document.write('<style>img { max-width: 100%; height: auto; margin-bottom: 20px; }</style>');
    printWindow.document.write('</head><body>');

    selectedImages.forEach(imgSrc => {
      printWindow.document.write(`<img src="${imgSrc}" />`);
    });

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  const { name, date, main_image, drive_link, access_code, album } = event;
  const handleSelectAllImages = () => {
    if (selectedImages.length === event.album.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(event.album);
    }
  };

  return (
    <div className="event-page">
      <div className="event-page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h1>{name}</h1>
      </div>

      {isEditing ? (
        <EditForm
          updatedEvent={updatedEvent}
          handleChange={handleChange}
          handleSaveChanges={handleSaveChanges}
          handleCancelEdit={handleCancelEdit}
        />
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

<ImageGrid
        album={album}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        handleSelectImage={handleSelectImage}
        handleDeleteImage={handleDeleteImage}
        handleDeleteSelectedImages={handleDeleteSelectedImages}
        handlePrintSelected={handlePrintSelected}
        handleSelectAllImages={handleSelectAllImages}
        handleAddImages={handleAddImages}
      />


      <div className="footer">
        {selectedImages.length > 0 && (
          <button className="delete-selected-button" onClick={handleDeleteSelectedImages}>
            <FaTrash /> Delete Selected
          </button>
        )}
        {selectedImages.length > 0 && (
          <button className="print-selected-button" onClick={handlePrintSelected}>
            <FaPrint /> Print Selected
          </button>
        )}
      </div>
    </div>
  );
};

export default EventPage;
