import React from 'react';
import PropTypes from 'prop-types'; 
import { FaTrash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 
import './EventCard.css'; // استيراد ملف CSS

const EventCard = ({ event, onDelete }) => {
  const { id, name, date, main_image, drive_link, access_code } = event;
  const navigate = useNavigate(); 

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`http://localhost:5005/api/events/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete event');
        }

        onDelete(id);
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event');
      }
    }
  };

  const handleCardClick = () => {
    navigate(`/admin-event/${id}`);
  };

  return (
    <div className="event-card" onClick={handleCardClick}>
      {/* أيقونة سلة القمامة */}
      <FaTrash
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
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
