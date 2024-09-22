import React from 'react';
import './AdminAlbumDetails.css';

const AdminAlbumDetails = ({ name,address,phoneNumber,email, date, status, onStatusChange }) => {
  const formattedDate = new Date(date).toLocaleDateString();
  const statusLabel = status ? 'تم' : 'لم تتم  ';
  const statusClass = status ? 'active' : 'inactive';

  return (
    <div className="admin-album-details">
      <h2 className="album-title">طلب طباعة للزبون : {name}</h2>
      <div className="album-info">
        <p><strong>التاريخ:</strong> {formattedDate}</p>
        <p><strong>عنوان الزبون:</strong> {address}</p>
        <p><strong>رقم الهاتف: </strong> {phoneNumber}</p>
        <p><strong>البريد الإلكتروني:</strong> {email}</p>
        <p><strong>حالة الطباعة :  </strong> 
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
        <span className="status-text">  تغيير حالة الطباعة  </span>
      </div>
    </div>
  );
};

export default AdminAlbumDetails;
