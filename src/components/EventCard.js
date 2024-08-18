// src/components/EventCard.js

import React from 'react';
import { FaTrash } from 'react-icons/fa'; // استيراد أيقونة سلة قمامة
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate

const EventCard = ({ event, onDelete }) => {
  const { id, name, date, main_image, drive_link, access_code } = event;
  const navigate = useNavigate(); // إعداد navigate

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    margin: '10px',
    padding: '15px',
    textAlign: 'center',
    backgroundColor: '#fff',
    position: 'relative', // إضافة لتحديد موقع الأيقونة
    cursor: 'pointer', // تغيير المؤشر للإشارة إلى التفاعل
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '8px 8px 0 0',
    marginBottom: '15px',
  };

  const nameStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  };

  const dateStyle = {
    fontSize: '16px',
    color: '#666',
    marginBottom: '15px',
  };

  const linkStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  };

  const linkHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`, {
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
    navigate(`/admin-event/${id}`); // الانتقال إلى صفحة التفاصيل للمناسبة
  };

  return (
    <div style={cardStyle} onClick={handleCardClick}>
      {/* أيقونة سلة القمامة */}
      <FaTrash
        onClick={(e) => {
          e.stopPropagation(); // منع الحدث من الانتقال إلى بطاقة التفاصيل
          handleDelete();
        }}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          color: '#dc3545',
          fontSize: '20px',
          transition: 'color 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.color = '#c82333')}
        onMouseOut={(e) => (e.target.style.color = '#dc3545')}
      />
      {main_image && <img src={main_image} alt={name} style={imageStyle} />}
      <div style={nameStyle}>{name}</div>
      <div style={dateStyle}>{date}</div>
      <a
        href={drive_link}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = linkStyle.backgroundColor)}
      >
        View Event
      </a>
      <div style={dateStyle}>{access_code}</div>
    </div>
  );
};

export default EventCard;
