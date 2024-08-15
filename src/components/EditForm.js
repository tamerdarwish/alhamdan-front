import React from 'react';
import { FaSave } from 'react-icons/fa';

const EditForm = ({ updatedEvent, handleChange, handleSaveChanges, handleCancelEdit }) => {
  return (
    <div className="edit-form">
      <label>
        Event Name:
        <input
          type="text"
          name="name"
          value={updatedEvent.name || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={updatedEvent.date || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Main Image URL:
        <input
          type="text"
          name="main_image"
          value={updatedEvent.main_image || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Drive Link:
        <input
          type="text"
          name="drive_link"
          value={updatedEvent.drive_link || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Access Code:
        <input
          type="text"
          name="access_code"
          value={updatedEvent.access_code || ''}
          onChange={handleChange}
        />
      </label>
      <button className="save-button" onClick={handleSaveChanges}>
        <FaSave /> Save Changes
      </button>
      <button className="cancel-button" onClick={handleCancelEdit}>
        Cancel
      </button>
    </div>
  );
};

export default EditForm;
