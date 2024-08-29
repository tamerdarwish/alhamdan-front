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
      <h2 style={styles.heading}>Login with Event Code</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Enter Event Code"
          value={eventCode}
          onChange={(e) => setEventCode(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
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
  },
  heading: {
    color: '#fff', // تأكد من أن النص يمكن رؤيته على خلفية الصورة
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default LoginPage;
