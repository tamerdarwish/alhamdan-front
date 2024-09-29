export const fetchPrintAlbums = async () => {
    try {
      const response = await fetch(`https://alhamdan-back-8.onrender.com/api/print/`);
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Failed to fetch Print Albums:', error);
    }
}


export const fetchAlbumDetails = async (albumID) => {
  try {
    const response = await fetch(`https://alhamdan-back-8.onrender.com/api/print/${albumID}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Failed to fetch album:', error);
  }
}

export const updateAlbumStatus = async (albumID, newStatus) => {
  try {
    const response = await fetch(`https://alhamdan-back-8.onrender.com/api/print/${albumID}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to update album status:', error);
  }
};


// ملف api.js

// photoService.js
export const uploadPhotos = async (formData) => {
  const response = await fetch(`https://alhamdan-back-8.onrender.com/api/print/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('فشل رفع الصور');
  }

  return response; // يمكنك إرجاع الاستجابة إذا كنت بحاجة إليها
};
