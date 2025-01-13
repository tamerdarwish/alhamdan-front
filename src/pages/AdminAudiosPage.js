import React, { useEffect, useState } from 'react';
import AdminAudioCard from '../components/AdminAudioCard';
import { fetchAudios, addAudio } from '../services/audios-api'; // تأكد من إضافة دالة addAudio في services
import './AdminAudiosPage.css'; // أنشئ هذا الملف لاحقًا
import Modal from '../components/Modal'; // استورد مكون النافذة المنبثقة
import { checkAdminAuth } from '../utils/adminAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminAudiosPage() {

  const navigate = useNavigate();

  useEffect(() => {
    const isAdminAuthenticated = checkAdminAuth();
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const [audios, setAudios] = useState([]);
  const [newAudio, setNewAudio] = useState({
    title: '',
    description: '',
    url: '',
    mainImage: null,
    imageFile: null,
  });
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة النافذة المنبثقة

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAudio({
      ...newAudio,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAudio({
        ...newAudio,
        mainImage: URL.createObjectURL(file),
        imageFile: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // تعيين حالة التحميل إلى true
    try {
      await addAudio(newAudio); // أضف الصوت الجديد
      // إعادة تعيين النموذج
      setNewAudio({
        title: '',
        description: '',
        url: '',
        mainImage: null,
        imageFile: null,
      });
      // تحديث الصفحة
      window.location.reload(); // إعادة تحميل الصفحة
    } catch (error) {
      console.error("Error adding audio:", error);
      alert(error.message); // استخدم رسالة الخطأ المعادة من الدالة
    } finally {
      setIsLoading(false); // تعيين حالة التحميل إلى false بعد الانتهاء
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // تغيير حالة النافذة المنبثقة
  };

  return (
    <div className="admin-audios-page">
      <h1 className="admin-audios-title">حفلات</h1>

      <button onClick={toggleModal} className="add-new-audio-btn">إضافة بطاقة جديدة</button>

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <form className="audio-form" onSubmit={handleSubmit}>
            <h2>إضافة بطاقة جديدة</h2>

            <input
              type="text"
              name="title"
              value={newAudio.title}
              onChange={handleChange}
              placeholder="العنوان"
              required
            />
            <textarea
              name="description"
              value={newAudio.description}
              onChange={handleChange}
              placeholder="الوصف"
              required
            />
            <input
              type="text"
              name="url"
              value={newAudio.url}
              onChange={handleChange}
              placeholder="الرابط"
              required
            />
            <input
              type="file"
              name="mainImage"
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'block', marginTop: '10px' }}
            />
            <button type="submit" disabled={isLoading}>إضافة</button>
          </form>
          {isLoading && <p className="loading-msg">جاري إضافة الحدث...</p>} {/* رسالة التحميل */}
        </Modal>
      )}

      <div className="admin-audios-grid">
        {audios.map((audio, index) => (
          <AdminAudioCard
            key={index}
            title={audio.title}
            description={audio.description}
            mainImage={audio.main_img}
            id={audio.id}
            url={audio.url}
          />
        ))}
      </div>
    </div>
  );
}
