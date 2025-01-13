//POST Image To Album Of Spicific Event
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


export const uploadImageToAlbum = async (eventId, formData) => {
  try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/api/upload/${eventId}/add-images`, {
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

// api.js

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const uploadResponse = await fetch(`${process.env.REACT_APP_SERVER}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  const uploadData = await uploadResponse.json();
  if (uploadData.success) {
    return uploadData.url;
  } else {
    throw new Error('Failed to upload image: ' + uploadData.message);
  }
};

export const saveEvent = async (eventDetails) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventDetails),
  });

  const data = await response.json();
  if (data.success) {
    return data;
  } else {
    throw new Error('Failed to save event: ' + data.message);
  }
};


//Download images with watermarkimport JSZip from 'jszip';

export const downloadImagesWithWatermark = async (selectedImages, watermark_setting, eventId) => {
  const zip = new JSZip();

  try {
    // حلقة للحصول على كل صورة وتطبيق العلامة المائية
    for (let image of selectedImages) {
      const fileName = image.url.split('/').pop();

      // استدعاء API للحصول على الصورة مع العلامة المائية
      const response = await fetch(`${process.env.REACT_APP_SERVER}/api/upload/watermark/${fileName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ watermark: watermark_setting, eventId: eventId }),
      });

      if (!response.ok) {
        throw new Error('Failed to download image');
      }

      // الحصول على البيانات كـ blob
      const blob = await response.blob();

      // التأكد من نوع الـ Blob (مثل image/jpeg أو image/png)
      const fileExtension = blob.type.split('/')[1]; // مثل 'jpeg' أو 'png'

      // إعادة تسمية الملف مع الامتداد الصحيح
      const newFileName = fileName.includes('.') ? fileName : `${fileName}.${fileExtension}`;

      // إضافة الصورة إلى المجلد المضغوط
      zip.file(newFileName, blob, { binary: true });
    }

    // إنشاء الملف المضغوط
    const zipContent = await zip.generateAsync({ type: 'blob' });

    // تنزيل الملف المضغوط
    saveAs(zipContent, 'images_with_watermark.zip');
    
  } catch (error) {
    console.error('Error:', error);
  }
};


export const deleteImageFromAlbum = async (eventId,imageId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/upload/${eventId}/delete-image`, {
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
        const response = await fetch(`${process.env.REACT_APP_SERVER}/api/upload/${eventId}/delete-images`, {
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
export const togglePrintStatus = async (eventId, imageId, currentStatus, copies) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/events/${eventId}/album/${imageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ printStatus: !currentStatus, copies }), // Include copies in the request body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update print status');
    }

    const data = await response.json();
    console.log('Print status and copies updated:', data);
    return data;
  } catch (error) {
    console.error('Failed to update print status or copies:', error.message);
  }
};

export const updateCopies = async (eventId, imageId, copies) => {

  
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/events/${eventId}/album-copies/${imageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({copies }), // Only send the copies property
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update copies');
    }

    const data = await response.json();
    console.log('Copies updated:', data);
    return data
  } catch (error) {
    console.error('Failed to update copies:', error.message);
  }
};

// services/images-api.js
export const uploadMainImage = async (eventId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/upload/update-main-image/${eventId}`, {
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
