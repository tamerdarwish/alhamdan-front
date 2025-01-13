import React, { useEffect, useState } from 'react';
import AudioCard from '../components/AudioCard';
import { fetchAudios } from '../services/audios-api';
import './AudiosPage.css'; // استيراد ملف CSS الجديد

export default function AudiosPage() {
  const [audios, setAudios] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // حالة نص البحث
  const [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية
  const itemsPerPage = 5; // عدد العناصر في كل صفحة

  useEffect(() => {
    const getAudios = async () => {
      try {
        const audioData = await fetchAudios();
        setAudios(audioData);
      } catch (error) {
        console.error("Error fetching audios:", error);
      }
    };

    getAudios();
  }, []);

  // تصفية البيانات بناءً على نص البحث
  const filteredAudios = audios.filter(audio =>
    audio.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // تحديد الصفحات
  const indexOfLastAudio = currentPage * itemsPerPage;
  const indexOfFirstAudio = indexOfLastAudio - itemsPerPage;
  const currentAudios = filteredAudios.slice(indexOfFirstAudio, indexOfLastAudio);

  // حساب عدد الصفحات
  const totalPages = Math.ceil(filteredAudios.length / itemsPerPage);

  return (
    <div className="audios-page">
      <h1 className="audios-page-title">تسجيلات الحمدان للحفلات</h1>
      <input
        type="text"
        placeholder="ابحث عن حفلة..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="audios-grid">
        {currentAudios.map((audio, index) => (
          <AudioCard
            key={index}
            title={audio.title}
            description={audio.description}
            mainImage={audio.main_img}
            id={audio.id}
          />
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          السابق
        </button>
        <span>صفحة {currentPage} من {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          التالي
        </button>
      </div>
    </div>
  );
}
