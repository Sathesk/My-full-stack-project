// src/Components/Services/AddressService.js
import axios from 'axios';
const ADDRESS_BASE_URL = import.meta.env.VITE_API_URL;

const addressService = {
  // Add address
  addUserAddress: (addressDto) => {
    return axios.post(`${ADDRESS_BASE_URL}/userprofile`, addressDto);
  },

  // Update address
  updateUserAddress: (addressDto) => {
    return axios.put(`${ADDRESS_BASE_URL}/userprofile`, addressDto);
  },

  // Get address by userId and addressType
  getUserAddress: (userId, addressType) => {
    return axios.get(`${ADDRESS_BASE_URL}/userprofile/${userId}`, {
      params: { addressType }
    });
  },

  // Delete address by ID
  deleteUserAddress: (addressId) => {
    return axios.delete(`${ADDRESS_BASE_URL}/userprofile/${addressId}`);
  }
};

export default addressService;
