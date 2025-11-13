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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWludWF0Ym9AeW9wbWFpbC5jb20iLCJpYXQiOjE3NjI5NDQ5MDksIm5iZiI6MTc2Mjk0NDkwOSwiZXhwIjoxNzYyOTczNzA5LCJhdWQiOiJ3ZW1hc3RlcnRyYWRlIiwic3ViIjoiNDNhM2RiMDQtNGY4YS00NGNkLWEyZjYtOTg5YjljMjZkNWU4IiwianRpIjoiWU93b2tpcEptbWFneXQ1VENCb0VOIn0.UWBHwGgqo7ZZ_7mk-EZUEcHqXayPbp0M1oJXAPN-3KA';
      
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
