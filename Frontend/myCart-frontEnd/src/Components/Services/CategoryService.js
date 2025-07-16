import axios from "axios";

const CATEGORY_BASE_URL = import.meta.env.VITE_API_URL;

const categoryService = {
    addNewCategory: (categoryDto) => {
        return axios.post(`${CATEGORY_BASE_URL}/categories`,categoryDto);
    },

    getAllCategories: () => {
        return axios.get(`${CATEGORY_BASE_URL}/categories`);
    }
}

export default categoryService;





