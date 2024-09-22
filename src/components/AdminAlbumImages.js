import React, { useState } from 'react';
import './AdminAlbumImages.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const sizes = [
  '9x13',
  '10x15',
  '13x18',
  '15x21',
  '20x30',
  '30x40',
  '30x45',
  'Photo 50x70',
  'Canvas 50x70',
  '100x70'
];

const AdminAlbumImages = ({ photos, customerName }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleSelectAll = () => {
    if (selectedPhotos.length === photos.length) {
      setSelectedPhotos([]);
    } else {
      setSelectedPhotos(photos);
    }
  };

  const handleSelectPhoto = (photo) => {
    setSelectedPhotos(prevState => {
      if (prevState.includes(photo)) {
        return prevState.filter(p => p !== photo);
      } else {
        return [...prevState, photo];
      }
    });
  };

  const handleDownloadZip = () => {
    if (selectedPhotos.length === 0) {
      alert('يرجى تحديد صور للتحميل.');
      return;
    }

    const zip = new JSZip();
    const mainFolder = zip.folder(customerName);

    selectedPhotos.forEach(photo => {
      const { url, size, copies } = photo;
      const folder = mainFolder.folder(size);
      for (let i = 1; i <= copies; i++) {
        const imageName = url.split('/').pop();
        const fileExtension = imageName.split('.').pop();
        const fileName = `${imageName.replace(`.${fileExtension}`, '')}_copy_${i}.${fileExtension}`;

        folder.file(fileName, fetch(url).then(res => res.blob()));
      }
    });

    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, `${customerName}_photos.zip`);
    });
  };

  const filteredPhotos = selectedSize 
    ? photos.filter(photo => photo.size === selectedSize) 
    : photos;

  return (
    <div className="album-images">
      <div className="size-filter">
        <label>تصفية حسب الحجم:</label>
        <select onChange={handleSizeChange} value={selectedSize}>
          <option value="">عرض جميع الأحجام</option>
          {sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

    

      <div className="actions">
  <button onClick={handleSelectAll}>
    <i className="fa fa-check-square"></i> تحديد الكل
  </button>
  <button onClick={handleDownloadZip}>
    <i className="fa fa-download"></i> تحميل الصور
  </button>
</div>


      <div className="image-gallery">
        {filteredPhotos.map((photo, index) => (
          <div 
            key={index} 
            className={`image-card ${selectedPhotos.includes(photo) ? 'selected' : ''}`}
            onClick={() => handleSelectPhoto(photo)}
          >
            <img src={photo.url} alt={`Image ${index}`} />
            <div className="image-info">
              <div className="image-size">{photo.size}</div>
              <div className="image-copies">عدد النسخ: {photo.copies}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAlbumImages;
