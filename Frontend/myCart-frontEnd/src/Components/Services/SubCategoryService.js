import axios from "axios";

const SUB_CATEGORY_BASE_URL = import.meta.env.VITE_API_URL;

const subCategoryService = {
    addNewSubCategory: (subCategoryDto) => {
        return axios.post(`${SUB_CATEGORY_BASE_URL}/subcategories`, subCategoryDto);
    },

    getAllSubCategories: () => {
        return axios.get(`${SUB_CATEGORY_BASE_URL}/subcategories`);
    }
}

export default subCategoryService;





