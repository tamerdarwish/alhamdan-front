import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { fetchEvents } from '../services/events-api';
import { checkAdminAuth } from '../utils/adminAuth';
import { FaPlus } from 'react-icons/fa'; 
import './AdminEvents.css';

const AdminEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const isAdminAuthenticated = checkAdminAuth();
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

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
    <div className="admin-events-container">
      <div className="events-grid">
        <Link to="/event/new" className="plus-button">
          <FaPlus />
        </Link>

        {/* عرض الكروت */}
        {events.map((event) => (
          <EventCard key={event.id} event={event} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
