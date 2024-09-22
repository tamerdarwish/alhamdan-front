import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminAlbumCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

export default function AdminAlbumCard({ name, date, img, id, status }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/album/${id}`);
  };

  return (
    <div className="admin-album-card" onClick={handleClick}>
      <div className="status-icon-container">
        <FontAwesomeIcon
          icon={status ? faCheckCircle : faHourglassHalf}
          className={`status-icon ${status ? 'status-icon-green' : 'status-icon-yellow'}`}
        />
      </div>
      <div className="album-image-container">
        {img && <img src={img} alt={name} className="album-image" />}
      </div>
      <div className="album-details">
        <div className="album-name">{name}</div>
        <div className="album-date">{new Date(date).toLocaleDateString()}</div>
      </div>
    </div>
  );
}
