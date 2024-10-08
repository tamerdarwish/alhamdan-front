import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAudioById } from '../services/audios-api';
import './AudioDetailsPage.css';

export default function AudioDetailsPage() {
  const { id } = useParams();
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const getAudio = async () => {
      try {
        const audioData = await fetchAudioById(id);
        setAudio(audioData);
      } catch (error) {
        console.error("Error fetching audio details:", error);
      }
    };

    getAudio();
  }, [id]);

  if (!audio) {
    return <div>Loading...</div>;
  }

  // استخراج معرف الفيديو من رابط يوتيوب
  const youtubeId = audio.url.split('v=')[1]; // أخذ الـ ID من الرابط
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;

  return (
    <div className="audio-details-page">
      <h1 className="audio-title">{audio.title}</h1>
      <p className="audio-description">{audio.description}</p>
      <div className="audio-video">
        <iframe
          width="560"
          height="315"
          src={embedUrl} // استخدام رابط التضمين
          title={audio.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
