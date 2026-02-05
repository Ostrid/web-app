import axios from 'axios';

export const backendAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

backendAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!config.params) config.params = {};
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


