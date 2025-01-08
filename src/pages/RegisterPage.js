import React, { useState } from 'react';
import { adminRegister } from '../services/admin-api';  // تأكد من المسار الصحيح للملف الذي يحتوي على الدالة

const RegisterPage = () => {
  // حالة للحفاظ على المدخلات (البريد الإلكتروني، كلمة المرور، اسم المستخدم)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // دالة لمعالجة تقديم النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // استدعاء دالة التسجيل
    const { token, error } = await adminRegister(email, password, username);

    if (token) {
      // في حال كان التسجيل ناجحًا
      alert('User registered successfully!');
      // يمكنك هنا تخزين التوكن في localStorage أو استخدامه بطريقة أخرى
      console.log('Token:', token);
    } else {
      // في حال حدوث خطأ
      setError(error);
    }

    setLoading(false);
  };

  return (
    <div className="register-page">
      <h2>Register New User</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
