import axios from "axios";

const AUTH_API_URL = import.meta.env.VITE_API_URL;


export default {
  
  register: (userData) => 
    axios.post(`${AUTH_API_URL}/authUsers`, userData),

  // Login 
  login: (credentials) => 
    axios.post(`${AUTH_API_URL}/authUsers/auth/login`, credentials), 

  // Get user profile
  getProfile: (userId, token) => 
    axios.get(`${AUTH_API_URL}/authUsers/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Update user
  updateUser: (userId, userData, token) => 
    axios.put(`${AUTH_API_URL}/authUsers/${userId}`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Delete user
  deleteUser: (userId, token) => 
    axios.delete(`${AUTH_API_URL}/authUsers/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
};