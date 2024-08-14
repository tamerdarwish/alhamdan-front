// src/components/MediaManager.js

import React, { useState, useEffect } from 'react';

const MediaManager = () => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const photoResponse = await fetch('/api/photos');
        const photoData = await photoResponse.json();
        setPhotos(photoData);

        const videoResponse = await fetch('/api/videos');
        const videoData = await videoResponse.json();
        setVideos(videoData);
      } catch (err) {
        console.error('Failed to fetch media', err);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div>
      <h2>Media Manager</h2>
      <div>
        <h3>Photos</h3>
        <ul>
          {photos.map(photo => (
            <li key={photo.id}>
              <img src={photo.url} alt={photo.description} style={{ width: '100px' }} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Videos</h3>
        <ul>
          {videos.map(video => (
            <li key={video.id}>
              <video width="320" height="240" controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MediaManager;
