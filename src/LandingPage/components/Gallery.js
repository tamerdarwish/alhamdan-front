// components/Gallery.js
import React from 'react';
import './Gallery.css';

import gallery1 from '../../assets/gallery1.JPG';
import gallery2 from '../../assets/gallery2.JPG';
import gallery3 from '../../assets/gallery3.JPG';
import gallery4 from '../../assets/gallery4.JPG';
import gallery5 from '../../assets/gallery5.JPG';
import gallery6 from '../../assets/gallery6.JPG';

const Gallery = () => {
  const images = [
    { src: gallery1, title: 'Wedding Ceremony' },
    { src: gallery2, title: 'Engagement Shoot' },
    { src: gallery3, title: 'Couple Portraits' },
    { src: gallery4, title: 'Wedding Venue' },
    { src: gallery5, title: 'Bridal Party' },
    { src: gallery6, title: 'Reception' },
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
