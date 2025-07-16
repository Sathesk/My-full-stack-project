// src/Components/Services/UserService.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // update port if needed

const userService = {
  // Create new user profile
  registerUserProfile: (userDto, token) => {
    return axios.post(`${BASE_URL}/userprofile`, userDto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  // Update user profile
  updateUserProfile: (userId, userDto, token) => {
    return axios.put(`${BASE_URL}/userprofile/${userId}`, userDto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  // Get single user by ID
  getUserById: (userId) => {
    return axios.get(`${BASE_URL}/userprofile/${userId}`);
  },

  // Get single user by username
  getUserByUsername: (userId) => {
    return axios.get(`${BASE_URL}/userprofile/username/${userId}`);
  },

  // Get all users
  getAllUsers: () => {
    return axios.get(`${BASE_URL}/userprofile`);
  },

  // Delete user by ID
  deleteUser: (userId) => {
    return axios.delete(`${BASE_URL}/userprofile/${userId}`);
  }
};

export default userService;
