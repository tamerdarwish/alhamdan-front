// eventHandlers.js
import imageCompression from 'browser-image-compression';
import { fetchEventById, editEvent } from '../services/events-api';
import { uploadImageToAlbum, deleteImageFromAlbum, deleteSelectedImagesFromAlbum,togglePrintStatus } from '../services/images-api';

// Fetch event data by ID
export const fetchEvent = async (eventId, setEvent, setUpdatedEvent, setLoading) => {
  try {
    const eventData = await fetchEventById(eventId);
    if (Array.isArray(eventData.album)) {
      eventData.album = eventData.album.map(image => JSON.parse(image));
    }
    setEvent(eventData);
    setUpdatedEvent(eventData);
    if (typeof setLoading === 'function') {
      setLoading(false);
    }
    return eventData;
  } catch (error) {
    console.error('Failed to fetch event:', error);
    if (typeof setLoading === 'function') {
      setLoading(false);
    }
    alert('Failed to fetch event');
  }
};

//Change PrintStatus Of Image
export const handleTogglePrintStatus = async (eventId, imageId, currentStatus, setAlbum) => {
  try {
    const updatedImage = await togglePrintStatus(eventId, imageId, currentStatus);
    if (updatedImage) {
      // قم بتحديث حالة الصورة في الواجهة الأمامية بعد التحديث الناجح
      setAlbum(prevAlbum =>
        prevAlbum.map(image =>
          image.id === imageId ? { ...image, printStatus: !currentStatus } : image
        )
      );
    }
  } catch (error) {
    console.error('Failed to update print status:', error);
  }
};



// Refetch updated event data
export const refetchEvent = async (updatedEvent, setEvent, setSelectedImages) => {
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

// Handle adding images to the event album
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

// Handle selecting an image
export const handleSelectImage = (imageUrl, selectedImages, setSelectedImages) => {
  if (selectedImages.includes(imageUrl)) {
    setSelectedImages(selectedImages.filter((img) => img !== imageUrl));
  } else {
    setSelectedImages([...selectedImages, imageUrl]);
  }
};

// Handle deleting an individual image from the album
export const handleDeleteImage = async (imageId, eventId, eventData, setEvent, setUpdatedEvent, setLoading) => {
  if (!window.confirm('Are you sure you want to delete this image?')) return;

  const updatedAlbum = eventData.album.filter((img) => img.id !== imageId);

  // تحديث الحالة محليًا قبل طلب الحذف
  setEvent(prevEvent => ({
    ...prevEvent,
    album: updatedAlbum,
  }));
  setUpdatedEvent(prevEvent => ({
    ...prevEvent,
    album: updatedAlbum,
  }));

  try {
    // تنفيذ عملية الحذف من الخادم
    await deleteImageFromAlbum(eventId, imageId);

    // إعادة جلب البيانات المحدثة من الخادم باستخدام دالة fetchEvent
    const updatedEvent = await fetchEvent(eventId, setEvent, setUpdatedEvent, setLoading);
    
    // لا حاجة لتحديث الحالة مرة أخرى، حيث أن fetchEvent يقوم بذلك بالفعل
  } catch (error) {
    console.error('Error deleting image:', error);
    alert('Failed to delete image');
    
    // استعادة الصورة في حالة حدوث خطأ
    const imageToRestore = eventData.album.find(img => img.id === imageId);
    if (imageToRestore) {
      setEvent(prevEvent => ({
        ...prevEvent,
        album: [...prevEvent.album, imageToRestore],
      }));
      setUpdatedEvent(prevEvent => ({
        ...prevEvent,
        album: [...prevEvent.album, imageToRestore],
      }));
    }
  }
};

// Handle deleting selected images from the album
export const handleDeleteSelectedImages = async (eventId, selectedImages, eventData, setEvent, setUpdatedEvent, setSelectedImages) => {
    if (!window.confirm('Are you sure you want to delete selected images?')) return;
  
    const imagesToDelete = selectedImages.map(img => img.id);
  
    try {
      const updatedAlbum = eventData.album.filter((img) => !imagesToDelete.includes(img.id));
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
  
      // في حالة حدوث خطأ، قم بإعادة الصور المحذوفة
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
  
  

// Handle toggling edit mode
export const handleEditClick = (setIsEditing) => {
  setIsEditing(true);
};

// Handle cancelling edit mode
export const handleCancelEdit = (setIsEditing, eventData, setUpdatedEvent) => {
  setIsEditing(false);
  setUpdatedEvent(eventData);
};

// Handle form input changes
export const handleChange = (e, setUpdatedEvent) => {
  const { name, value } = e.target;
  setUpdatedEvent(prevEvent => ({
    ...prevEvent,
    [name]: value,
  }));
};

// Handle saving changes to the event
export const handleSaveChanges = async (eventId, updatedEvent, setEvent, setUpdatedEvent, setIsEditing, setLoading) => {
  try {
    const data = await editEvent(eventId, updatedEvent);
    setEvent(data);
    setUpdatedEvent(data);
    setIsEditing(false);
  } catch (error) {
    console.error('Error updating event:', error);
    alert('Failed to update event');
    setUpdatedEvent(prevEvent => prevEvent);
  } finally {
    setLoading(false);
  }
};

// Handle printing selected images
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

// Handle selecting all images
export const handleSelectAllImages = (selectedImages, eventData, setSelectedImages) => {
  if (selectedImages.length === eventData.length) {
    setSelectedImages([]);
  } else {
    setSelectedImages(eventData);
  }
};
