import axios from 'axios';
import { toast } from 'react-toastify';
import { storage } from '../utils/storage';
import { ROUTES } from '../constants/routes';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      storage.clearAuth();
      toast.error('Session expired. Please login again.');
      window.location.href = ROUTES.LOGIN;
    } else if (status === 403) {
      window.location.href = ROUTES.FORBIDDEN;
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    return Promise.reject(error);
  }
);

export default api;