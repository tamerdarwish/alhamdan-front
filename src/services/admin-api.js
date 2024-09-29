export const adminLogin = async (email, password) => {
    try {
      const response = await fetch(`https://alhamdan-back-8.onrender.com/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok && data) {
        return { token: data.token, error: null };
      } else {
        return { token: null, error: data.message || 'Invalid credentials' };
      }
    } catch (err) {
      return { token: null, error: 'An error occurred. Please try again.' };
    }
  };
  