import React from 'react';
import './AudioCard.css';
import { Link } from 'react-router-dom';

export default function AudioCard({ id, title, description, mainImage }) {
  return (
    <Link to={`/audio/${id}`} className="audio-card-link">
      <div className="audio-card">
        <img src={mainImage} alt={title} className="audio-card-image" />
        <div className="audio-card-content">
          <h3 className="audio-card-title">{title}</h3>
          <p className="audio-card-description">{description}</p>
        </div>
      </div>
    </Link>
  );
}
