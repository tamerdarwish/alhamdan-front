import React, { useState } from 'react';
import { adminLogin } from '../services/admin-api'; // استيراد الدالة الجديدة

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { token, error } = await adminLogin(email, password); // استخدام الدالة الجديدة

    if (token) {
      // تخزين الـ token في localStorage
      localStorage.setItem('adminToken', token);

      // توجيه الأدمن إلى لوحة التحكم
      window.location.href = '/admin/dashboard';
    } else {
      setError(error);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleAdminLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          disabled={loading}
        />
        <button type="submit" style={{ width: '100%', padding: '8px' }} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
