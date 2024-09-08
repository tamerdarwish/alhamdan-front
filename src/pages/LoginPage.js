import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// دالة افتراضية للتحقق من صحة كود الوصول
const verifyEventCode = async (eventCode) => {
  try {
    const response = await fetch(`http://localhost:5000/api/events/by-code/${eventCode}`);
    if (!response.ok) {
      throw new Error('Event not found or error fetching event');
    }
    const data = await response.json();
    return data.id; // افترض أن الـ API يعيد معرّف المناسبة في الحقل `id`
  } catch (error) {
    console.error('Error verifying event code:', error);
    return null;
  }
};

const LoginPage = () => {
  const [eventCode, setEventCode] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // تحقق من صحة كود الوصول
      const eventId = await verifyEventCode(eventCode);

      if (eventId) {
        // إذا كان الكود صحيحًا، توجه إلى صفحة المناسبة باستخدام معرف المناسبة
        navigate(`/event/${eventId}`);
      } else {
        alert('Invalid event code');
      }
    } catch (error) {
      console.error('Error verifying event code:', error);
      alert('Error verifying event code. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>لرؤية صور مناسبتك الخاصة</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="أدخل الكود الذي بحوزتك هنا"
          value={eventCode}
          onChange={(e) => setEventCode(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>الدخول</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url(/hero-bg.jpg)', // أضف هنا مسار الصورة
    backgroundSize: 'cover', // لتغطية الخلفية بالكامل
    backgroundPosition: 'center', // لضبط الصورة في المنتصف
    backgroundRepeat: 'no-repeat', // عدم تكرار الصورة
    fontFamily: 'Cairo, sans-serif', // تطبيق خط كايرو
  },
  heading: {
    color: '#fff', // تأكد من أن النص يمكن رؤيته على خلفية الصورة
    marginBottom: '20px',
    fontFamily: 'Cairo, sans-serif', // تطبيق خط كايرو
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    fontFamily: 'Cairo, sans-serif', // تطبيق خط كايرو
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    fontFamily: 'Cairo, sans-serif', // تطبيق خط كايرو
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#fe9e06',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Cairo, sans-serif', // تطبيق خط كايرو
  },
};

export default LoginPage;
