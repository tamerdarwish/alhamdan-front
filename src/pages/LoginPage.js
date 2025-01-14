import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyEventCode } from '../services/events-api'; // استيراد الدالة الخارجية
import Swal from 'sweetalert2'; // استيراد SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // استيراد CSS الخاص بـ SweetAlert2
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
        Swal.fire({
          icon: 'error',  // تحديد نوع الأيقونة (خطأ)
          title: 'حدث خطأ!',
          text: 'الكود الذي غير صالح!',
          confirmButtonText: 'حسنًا',
          customClass: {
            title: 'swal2-title',   // فئات مخصصة للعنوان
            content: 'swal2-content',  // فئات مخصصة للنص
            confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
          }
        });  
            }
    } catch (error) {
      console.error('Error verifying event code:', error);
      Swal.fire({
        icon: 'error',  // تحديد نوع الأيقونة (خطأ)
        title: 'حدث خطأ!',
        text: 'حدث خطأ أثناء التحقق من الكود. يرجى المحاولة مرة أخرى.',
        confirmButtonText: 'حسنًا',
        customClass: {
          title: 'swal2-title',   // فئات مخصصة للعنوان
          content: 'swal2-content',  // فئات مخصصة للنص
          confirmButton: 'swal2-confirm-button'  // فئات مخصصة للزر
        }
      });      }
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
  },
  heading: {
    color: 'black', // تأكد من أن النص يمكن رؤيته على خلفية الصورة
    marginBottom: '20px',
    fontFamily: 'Aref Ruqaa, serif', 
    fontSize: '3rem'
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
