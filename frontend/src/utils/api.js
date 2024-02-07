import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Update with your backend URL
  headers: {
    'Content-Type': 'application/json',
    
    
   // Add any additional headers here
    
  }
});

export default api;
