import axios from "axios";

const PRODUCT_API_BASE_URL = import.meta.env.VITE_API_URL;

const productService = {

  getAllProducts: () => {
    return axios.get(`${PRODUCT_API_BASE_URL}/products/productDetails`);
  },

  getProductsBySellerId: (sellerId) => {
    return axios.get(`${PRODUCT_API_BASE_URL}/products/sellerId/${sellerId}`);
  },

  addProducts: (productRequestDto) => {
    return axios.post(`${PRODUCT_API_BASE_URL}/products`, productRequestDto);
  }
};

export default productService;


