import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './EventInfo.css';
import { useNavigate } from 'react-router-dom';



const EventInfo = ({
  name,
  date,
  main_image,
  drive_link,
  access_code,
}) => {
  const navigate = useNavigate();

  return (
    <div className="event-info">
      <button className="back-button" onClick={() => navigate(-1) || navigate('/')}>
        <FaArrowLeft />
      </button>
      {main_image && <img src={main_image} alt={name} className="event-image" />}
      <div className="event-details">
        <h1 className="event-name">{name}</h1>
        <p className="event-date">{date}</p>
        {drive_link && (
          <a href={drive_link} className="event-link-button" target="_blank" rel="noopener noreferrer">
            View Event Videos
          </a>
        )}
        {access_code && <p className="event-access-code">Access Code: {access_code}</p>}
      </div>
    </div>
  );
};

export default EventInfo;
