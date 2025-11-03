import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://admin-be-stg3.wemastertrade.com/api/v1/wmt',
  headers: {
    'application-id': '8eed2241-25c4-413b-8a40-c88ad258c62e',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWludWF0Ym9AeW9wbWFpbC5jb20iLCJpYXQiOjE3NjIxNjYwODcsIm5iZiI6MTc2MjE2NjA4NywiZXhwIjoxNzYyMTk0ODg3LCJhdWQiOiJ3ZW1hc3RlcnRyYWRlIiwic3ViIjoiNDNhM2RiMDQtNGY4YS00NGNkLWEyZjYtOTg5YjljMjZkNWU4IiwianRpIjoiRTdqenFMLXhFMW51T0xGWnZqOEtlIn0.OyV8hvre24gRIAWEGEZEK4B_IVPbzPtz24cI2WhEa2s';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
