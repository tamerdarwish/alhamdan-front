// components/Gallery.js
import React from 'react';
import './Gallery.css';

import gallery1 from '../../assets/gallery1.jpg';
import gallery2 from '../../assets/gallery2.jpg';
import gallery3 from '../../assets/gallery3.jpg';
import gallery4 from '../../assets/gallery4.jpg';
import gallery5 from '../../assets/gallery5.jpg';
import gallery6 from '../../assets/gallery6.jpg';

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
              <img src={image.src} alt={image.title} className="gallery-image" />
              <div className="gallery-overlay">
                <div className="gallery-text">{image.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
