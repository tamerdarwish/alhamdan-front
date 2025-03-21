import React from 'react';
import PropTypes from 'prop-types'; // استيراد مكتبة PropTypes
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
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      {main_image && <img src={main_image} alt={name} className="event-image" />}
      <div className="event-details">
        <h1 className="event-name">{name}</h1>
        <p className="event-date">{date}</p>
        {drive_link && (
          <a href={drive_link} className="event-link-button" target="_blank" rel="noopener noreferrer">
            الانتقال الى رابط الفيديوهات
          </a>
        )}
        {access_code && <p className="event-access-code">كود الوصول: {access_code}</p>}
      </div>
    </div>
  );
};

// تحديد الأنواع باستخدام PropTypes
EventInfo.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  main_image: PropTypes.string,
  drive_link: PropTypes.string,
  access_code: PropTypes.string,
};

export default EventInfo;
