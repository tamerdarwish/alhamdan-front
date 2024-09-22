export const fetchPrintAlbums = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/print/');
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Failed to fetch Print Albums:', error);
    }
}


export const fetchAlbumDetails = async (albumID) => {
  try {
    const response = await fetch(`http://localhost:5005/api/print/${albumID}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Failed to fetch album:', error);
  }
}

export const updateAlbumStatus = async (albumID, newStatus) => {
  try {
    const response = await fetch(`http://localhost:5005/api/print/${albumID}/status`, {
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
