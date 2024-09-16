// src/services/postService.js
import axios from 'axios';

export const fetchPosts = async () => {
  const response = await axios.get('/api/posts', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};
