// src/services/authService.js
import {  serverapi } from '@/data/server';
import axios from 'axios';

const server = serverapi;
export const login = async (username, password) => {
  const response = await axios.post(`${server}/api/auth/login`, { username, password });
  return response.data;
};

export const signup = async ({username,email,password,birthDate,role,profilePic}) => {
  console.log({ username, email, password, birthDate, role, profilePic });

  const response = await axios.post(`${server}/api/auth/signup`, { username,email,password,birthDate,role,profilePic});
  return response.data;
};

