// eventHandlers.js

import imageCompression from 'browser-image-compression';
import { uploadImageToAlbum, deleteImageFromAlbum, deleteSelectedImagesFromAlbum } from '../services/images-api';
import { editEvent, fetchEventById } from '../services/events-api';

export const handleAddImages = async (e, eventId, eventData, setEvent, setUpdatedEvent) => {
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
    const updatedAlbum = [...eventData.album, ...newImages];
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

export const handleSelectImage = (imageUrl, selectedImages, setSelectedImages) => {
  if (selectedImages.includes(imageUrl)) {
    setSelectedImages(selectedImages.filter((img) => img !== imageUrl));
  } else {
    setSelectedImages([...selectedImages, imageUrl]);
  }
};

export const handleDeleteImage = async (imageId, eventId, eventData, setEvent, setUpdatedEvent) => {
  if (!window.confirm('Are you sure you want to delete this image?')) return;

  const updatedAlbum = eventData.album.filter((img) => img.id !== imageId);
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
      album: [...prevEvent.album, eventData.album.find(img => img.id === imageId)],
    }));
    setUpdatedEvent(prevEvent => ({
      ...prevEvent,
      album: [...prevEvent.album, eventData.album.find(img => img.id === imageId)],
    }));
  }
};

export const handleDeleteSelectedImages = async (selectedImages, eventId, eventData, setEvent, setUpdatedEvent, setSelectedImages) => {
  if (!window.confirm('Are you sure you want to delete selected images?')) return;

  try {
    const updatedAlbum = eventData.album.filter((img) => !selectedImages.includes(img));
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

export const handleEditClick = (setIsEditing) => {
  setIsEditing(true);
};

export const handleCancelEdit = (setIsEditing, setUpdatedEvent, eventData) => {
  setIsEditing(false);
  setUpdatedEvent(eventData);
};

export const handleChange = (e, setUpdatedEvent) => {
  const { name, value } = e.target;
  setUpdatedEvent(prevEvent => ({
    ...prevEvent,
    [name]: value,
  }));
};

export const handleSaveChanges = async (eventId, updatedEvent, setEvent, setUpdatedEvent, setIsEditing, setLoading) => {
    try {
      const response = await editEvent(eventId, updatedEvent); // استخدم 'response' بدلاً من 'data'
      setEvent(response);
      setUpdatedEvent(response);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
      setUpdatedEvent(prevEvent => ({
        ...prevEvent,
        ...updatedEvent, // استخدم 'updatedEvent' بدلاً من 'data'
      }));
    } finally {
      setLoading(false);
    }
  };
  
export const handlePrintSelected = (selectedImages) => {
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
};

export const handleSelectAllImages = (event, selectedImages, setSelectedImages) => {
    if (!event || !event.album) {
      console.error('Event or album is not defined');
      return;
    }
  
    if (!Array.isArray(event.album)) {
      console.error('Event album is not an array');
      return;
    }
  
    if (selectedImages.length === event.album.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(event.album);
    }
  };
  