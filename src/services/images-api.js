import axios from 'axios';

//POST Image To Album Of Spicific Event

export const uploadImageToAlbum = async (eventId, formData) => {
    try {
        const response = await fetch(`http://localhost:5000/api/upload/${eventId}/add-images`, {
            method: 'POST',
            body: formData,
          });
  
          if (!response.ok) {
            throw new Error('Failed to upload image');
          }
          const data = await response.json();
return data
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
}



export const deleteImageFromAlbum = async (eventId,imageId) => {
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
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
}

export const deleteSelectedImagesFromAlbum = async (eventId,selectedImages) => {
    try {
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
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
}
// Change printStatus of a specific image in the album
export const togglePrintStatus = async (eventId, imageId, currentStatus) => {
  try {
    const response = await fetch(`http://localhost:5000/api/events/${eventId}/album/${imageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ printStatus: !currentStatus }),
    });

    // التحقق من الاستجابة
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update print status');
    }

    const data = await response.json();
    console.log('Print status updated:', data);
    return data;
  } catch (error) {
    console.error('Failed to update print status:', error.message);
  }
};


// services/images-api.js
export const uploadMainImage = async (eventId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`http://localhost:5000/api/upload/update-main-image/${eventId}`, {
      method: 'POST',
      body: formData, // إرسال FormData التي تحتوي على الصورة
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    
    const data = await response.json();
    if (data.success) {
      return data.url; // استرجاع الرابط الجديد للصورة
    } else {
      throw new Error(data.message || 'Failed to upload image');
    }
  } catch (error) {
    console.error('Failed to upload image:', error);
  }
}


export default uploadMainImage;
