import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add logic here to inject tokens, e.g., config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify response data if needed
    return response.data;
  },
  (error: AxiosError) => {
    // Handle global errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;
