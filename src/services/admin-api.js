export const adminLogin = async (email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/admin/login`, {
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
  
  export const adminRegister = async (email, password, username) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/admin/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });
  
      const data = await response.json();
  
      if (response.ok && data) {
        return { token: data.token, error: null };
      } else {
        return { token: null, error: data.message || 'Registration failed' };
      }
    } catch (err) {
      return { token: null, error: 'An error occurred. Please try again.' };
    }
  };
  