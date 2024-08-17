// EventInfo.js
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import EditForm from '../components/EditForm';
import './EventInfo.css';

const EventInfo = ({
  name,
  date,
  main_image,
  drive_link,
  access_code,
  isEditing,
  updatedEvent,
  setUpdatedEvent,
  handleEditClick,
  handleChange,
  handleSaveChanges,
  handleCancelEdit,
  navigate,
  setIsEditing,
  eventId,
  setEvent,
  setLoading,
}) => {
  return (
    <div className="event-info">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      {main_image && <img src={main_image} alt={name} />}
      <h1>{name}</h1>
      <p>{date}</p>
      {isEditing ? (
        <EditForm
          updatedEvent={updatedEvent}
          handleChange={(e) => handleChange(e, setUpdatedEvent)}
          handleSaveChanges={() =>
            handleSaveChanges(eventId, updatedEvent, setEvent, setUpdatedEvent, setIsEditing, setLoading)
          }
          handleCancelEdit={() => handleCancelEdit(setIsEditing, { name, date, main_image, drive_link, access_code }, setUpdatedEvent)}
        />
      ) : (
        <>
          <p>Access Code: {access_code}</p>
          <p>
            Drive Link: <a href={drive_link} target="_blank" rel="noopener noreferrer">{drive_link}</a>
          </p>
          <button className="edit-button" onClick={() => handleEditClick(setIsEditing)}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default EventInfo;
