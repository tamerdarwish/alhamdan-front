import React from 'react';
import PropTypes from 'prop-types'; // استيراد مكتبة PropTypes
import { FaSave } from 'react-icons/fa';

const EditForm = ({ updatedEvent, handleChange, handleSaveChanges, handleCancelEdit }) => {
  return (
    <div className="edit-form">
      <label>
        عنوان المناسبة:
        <input
          type="text"
          name="name"
          value={updatedEvent.name || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        تاريخ المناسبة
        <input
          type="date"
          name="date"
          value={updatedEvent.date || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        رابط خارجي للفيديوهات
        <input
          type="text"
          name="drive_link"
          value={updatedEvent.drive_link || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        كود الوصول للزبون:
        <input
          type="text"
          name="access_code"
          value={updatedEvent.access_code || ''}
          onChange={handleChange}
        />
      </label>
      <button className="save-button" onClick={handleSaveChanges}>
        <FaSave /> حفظ التغييرات
      </button>
      <button className="cancel-button" onClick={handleCancelEdit}>
        إلغاء
      </button>
    </div>
  );
};

// تحديد الأنواع باستخدام PropTypes
EditForm.propTypes = {
  updatedEvent: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    drive_link: PropTypes.string,
    access_code: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
};

export default EditForm;
