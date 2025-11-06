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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWludWF0Ym9AeW9wbWFpbC5jb20iLCJpYXQiOjE3NjIzOTUxMjYsIm5iZiI6MTc2MjM5NTEyNiwiZXhwIjoxNzYyNDIzOTI2LCJhdWQiOiJ3ZW1hc3RlcnRyYWRlIiwic3ViIjoiNDNhM2RiMDQtNGY4YS00NGNkLWEyZjYtOTg5YjljMjZkNWU4IiwianRpIjoiY3J4b2NqS1NpWmg1MjVlVy1Ddno3In0.T8VbWEsbJ5CgJzJWyt_yX1T-YKZpk1kOFYrcd9nqChc';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
