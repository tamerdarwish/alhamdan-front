import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { fetchEvents } from '../services/events-api'; // إضافة فاصلة منقوطة هنا

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      let events = await fetchEvents();
      setEvents(events);
    };

    getEvents();
  }, []);

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <Link to="/event/new">
        <button style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}>
          Create New Event
        </button>
      </Link>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
