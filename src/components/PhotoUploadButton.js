// PhotoUploadButton.js
import React from 'react';
import './PhotoUploadButton.css';

const PhotoUploadButton = ({ onClick }) => {
  return (
    <div className="photo-upload-button" onClick={onClick}>
      <span>+</span>
    </div>
  );
};

export default PhotoUploadButton;
