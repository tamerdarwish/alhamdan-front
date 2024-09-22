import React from 'react';
import './AdminAlbumDetails.css';

const AdminAlbumDetails = ({ name, date, status, onStatusChange }) => {
  const formattedDate = new Date(date).toLocaleDateString();
  const statusLabel = status ? 'تمت الطباعة' : 'لم تتم الطباعة بعد';
  const statusClass = status ? 'active' : 'inactive';

  return (
    <div className="admin-album-details">
      <h2 className="album-title">{name}</h2>
      <div className="album-info">
        <p><strong>التاريخ:</strong> {formattedDate}</p>
        <p><strong>الحالة:</strong> 
          <span className={statusClass}>
            {statusLabel}
          </span>
        </p>
      </div>
      <div className="status-toggle">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={status} 
            onChange={() => onStatusChange(!status)} 
          />
          <span className="slider round"></span>
        </label>
        <span className="status-text">{status ? 'تمت الطباعة' : 'لم تتم الطباعة بعد'}</span>
      </div>
    </div>
  );
};

export default AdminAlbumDetails;
