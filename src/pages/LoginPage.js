// src/pages/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [eventCode, setEventCode] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // تحقق من صحة الكود
    if (eventCode) {
      // هنا يتم تنفيذ عملية التحقق من الكود (مثلاً عبر API call)
      // إذا كان الكود صحيح، يمكن توجيه المستخدم للصفحة المطلوبة
      navigate(`/event/${eventCode}`);
    } else {
      alert('Invalid event code');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login with Event Code</h2>
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
