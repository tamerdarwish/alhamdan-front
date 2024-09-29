import React from 'react';
import PropTypes from 'prop-types'; 
import { FaTrash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 
import './EventCard.css'; // استيراد ملف CSS
import {handleDelete} from '../services/events-api'

const EventCard = ({ event, onDelete }) => {
  const { id, name, date, main_image, drive_link, access_code } = event;
  const navigate = useNavigate(); 

 

  const handleCardClick = () => {
    navigate(`/admin-event/${id}`);
  };

  return (
    <div className="event-card" onClick={handleCardClick}>
      {/* أيقونة سلة القمامة */}
      <FaTrash
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(id,onDelete);
        }}
        className="trash-icon"
      />
      {main_image && <img src={main_image} alt={name} />}
      <div className="event-name">{name}</div>
      <div className="event-date">{date}</div>
    
      <div className="event-access-code">{access_code}</div>
    </div>
  );
};

// تحديد الأنواع باستخدام PropTypes
EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    main_image: PropTypes.string,
    drive_link: PropTypes.string,
    access_code: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EventCard;
