// components/Gallery.js
import React from 'react';
import './Gallery.css';

const Gallery = () => {
  const images = [
    { src: '/assets/gallery1.JPG', title: 'Wedding Ceremony' },
    { src: '/assets/gallery2.JPG', title: 'Engagement Shoot' },
    { src: '/assets/gallery3.JPG', title: 'Couple Portraits' },
    { src: '/assets/gallery4.JPG', title: 'Wedding Venue' },
    { src: '/assets/gallery5.JPG', title: 'Bridal Party' },
    { src: '/assets/gallery6.JPG', title: 'Reception' },
  ];

  return (
    <section id="gallery" className="gallery">
      <div className="gallery-container">
        <h2 className="gallery-title">من أعمالنا</h2>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div className="gallery-item" key={index}>
              <img src={image.src} className="gallery-image" />
              <div className="gallery-overlay">
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
