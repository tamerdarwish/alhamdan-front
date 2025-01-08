import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`, // أو URL الباك إند الخاص بك
});

const apiService = {
  login: async (code) => {
    const response = await apiClient.post('/login', { code });
    return response.data;
  },

  createEvent: async (event) => {
    const response = await apiClient.post('/events', event);
    return response.data;
  },

  // أضف المزيد من الطلبات حسب الحاجة
};

export default apiService;
