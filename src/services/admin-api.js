export const adminLogin = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:5005/admin/login`, {
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
  