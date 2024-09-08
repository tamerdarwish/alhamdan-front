import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEvent } from '../services/eventHandlers';
import { handleTogglePrintStatus } from '../services/eventHandlers';
import './EventPage.css';
import ImageGrid from '../components/ImageGrid';
import EventInfo from '../components/EventInfo';


const ViewEventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [album, setAlbum] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await fetchEvent(eventId, setEvent, setLoading);

      if (eventData && Array.isArray(eventData.album)) {
        setAlbum(eventData.album);
      }
    };

    fetchData();
  }, [eventId]);

  const handlePrintStatusToggle = async (imageId, currentStatus) => {
    await handleTogglePrintStatus(eventId, imageId, currentStatus, setAlbum);
    
    // إعادة تحميل البيانات لتحديث الألبوم
    const updatedEventData = await fetchEvent(eventId, setEvent, setLoading);
    if (updatedEventData && Array.isArray(updatedEventData.album)) {
      setAlbum(updatedEventData.album);
    }
  };
  

  const { name, date, main_image, drive_link, access_code,watermark_setting } = event || {};


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
        isEditing={false}
      />
      <div className="event-page-album">
        <ImageGrid
          album={album}
          handlePrintStatusToggle={handlePrintStatusToggle}
          watermark_setting={watermark_setting}
        />
      </div>
    </div>
  );
};

export default ViewEventPage;
