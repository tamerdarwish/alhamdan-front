import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminAlbumImages from '../components/AdminAlbumImages';
import AdminAlbumDetails from '../components/AdminAlbumDetails';
import { fetchAlbumDetails, updateAlbumStatus } from '../services/printsHandler';
import { checkAdminAuth } from '../utils/adminAuth';
import './AdminPrintAlbum.css';

export default function AdminPrintAlbum() {
  const [album, setAlbum] = useState(null);
  const [status, setStatus] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminAuthenticated = checkAdminAuth();
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    const getAlbum = async () => {
      try {
        const fetchedAlbum = await fetchAlbumDetails(id);
        if (fetchedAlbum) {
          setAlbum(fetchedAlbum);
          setStatus(fetchedAlbum.status);
        }
      } catch (error) {
        console.error('Failed to fetch album details:', error);
      }
    };
    getAlbum();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateAlbumStatus(id, newStatus);
      setStatus(newStatus);
      setAlbum(prev => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error('Failed to update album status:', error);
    }
  };

  if (!album) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-print-album">
      <div className="album-header">
        <AdminAlbumDetails
          name={album.customer_name}
          address={album.address}
          phoneNumber={album.phone_number}
          email={album.customer_email}
          date={album.created_at}
          status={status}
          onStatusChange={handleStatusChange}
        />
      </div>
      <AdminAlbumImages photos={album.photos} customerName={album.customer_name} />
    </div>
  );
}
