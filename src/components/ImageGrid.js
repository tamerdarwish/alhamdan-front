// ImageGrid.js
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import '../pages/EventPage.css';

const ImageGrid = ({ album, handlePrintStatusToggle }) => {
  return (
    <div className="album-section">
      <h2>Album</h2>

      {album.length === 0 ? (
        <p className="no-images">No images in the album.</p>
      ) : (
        <div className="images-grid">
          {album.map((image) => (
            <div key={image.id} className="image-container">
              <img src={image.url} alt={`Album image ${image.id}`} className="album-image" />
              <FaCheck
                className={`status-icon ${image.selected_for_printing ? 'checked' : 'unchecked'}`}
                onClick={() => handlePrintStatusToggle(image.id, image.selected_for_printing)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
