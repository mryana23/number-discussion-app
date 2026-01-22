import axios from 'axios';
import { AuthResponse, Post } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { username, password });
    return response.data;
  },
  
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
};

export const postsAPI = {
  getAllPosts: async (): Promise<Post[]> => {
    const response = await api.get('/posts');
    return response.data;
  },
  
  createStartNumber: async (startNumber: number): Promise<Post> => {
    const response = await api.post('/posts/start', { startNumber });
    return response.data;
  },
  
  addOperation: async (
    parentId: string,
    operation: '+' | '-' | '*' | '/',
    operand: number
  ): Promise<Post> => {
    const response = await api.post('/posts/operation', { parentId, operation, operand });
    return response.data;
  },
};