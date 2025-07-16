import axios from "axios";

const ORDER_API_BASE_URL = import.meta.env.VITE_API_URL;

export const createNewOrder = (orderData) => {
  return axios.post(`${ORDER_API_BASE_URL}/orders`, orderData);
};

export const getOrderById = (orderId) => {
  return axios.get(`${ORDER_API_BASE_URL}/orders` + `/${orderId}`);
};