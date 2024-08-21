import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  fetchEvent, 
  refetchEvent, 
  handleAddImages, 
  handleSelectImage, 
  handleDeleteImage, 
  handleDeleteSelectedImages, 
  handleEditClick, 
  handleCancelEdit, 
  handleChange, 
  handleSaveChanges, 
  handlePrintSelected, 
  handleSelectAllImages 
} from '../services/eventHandlers';
import './EventPage.css';
import ImageGrid from '../components/AdminImageGrid';
import EventInfo from '../components/AdminEventInfo'; // استيراد مكون EventInfo

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent(eventId, setEvent, setUpdatedEvent, setLoading);
  }, [eventId]);

  useEffect(() => {
    refetchEvent(updatedEvent, setEvent, setSelectedImages);
  }, [updatedEvent]);

  const { name, date, main_image, drive_link, access_code, album } = event || {};

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!event) {
    return <div className="error">Event not found.</div>;
  }

  return (
    <div className="event-page">
      <EventInfo
        name={name}
        date={date}
        main_image={main_image}
        drive_link={drive_link}
        access_code={access_code}
        isEditing={isEditing}
        updatedEvent={updatedEvent}
        setUpdatedEvent={setUpdatedEvent}
        handleEditClick={handleEditClick}
        handleChange={handleChange}
        handleSaveChanges={handleSaveChanges}
        handleCancelEdit={handleCancelEdit}
        navigate={navigate}
        setIsEditing={setIsEditing}
        eventId={eventId}
        setEvent={setEvent}
        setLoading={setLoading}
      />
      <div className="event-page-album">
      <ImageGrid
  album={album}
  selectedImages={selectedImages}
  setSelectedImages={setSelectedImages}
  handleSelectImage={(image) => handleSelectImage(image, selectedImages, setSelectedImages)}
  handleDeleteImage={(imageId) => handleDeleteImage(imageId, eventId, event, setEvent, setUpdatedEvent, setLoading)} // هنا
  handleDeleteSelectedImages={() => handleDeleteSelectedImages(eventId, selectedImages, event, setEvent, setUpdatedEvent, setSelectedImages)}
  handlePrintSelected={() => handlePrintSelected(selectedImages)}
  handleSelectAllImages={() => handleSelectAllImages(selectedImages, event.album, setSelectedImages)}
  handleAddImages={(e) => handleAddImages(e, eventId, event, setEvent, setUpdatedEvent)} 
/>

      </div>
    </div>
  );
};

export default EventPage;
