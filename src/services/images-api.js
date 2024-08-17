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