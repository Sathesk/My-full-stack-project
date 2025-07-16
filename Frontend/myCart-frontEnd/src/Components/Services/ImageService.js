import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const createAxiosInstance = (token) => {
  return axios.create({
    baseURL: `${BASE_URL}/images`,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    timeout: 30000,
  });
};

const imageService = {
  uploadImage: async (file, userAuthId, username, token, onUploadProgress) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userAuthId', userAuthId);
      formData.append('username', username);

      const instance = createAxiosInstance(token);

      const response = await instance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw imageService.handleError(error);
    }
  },

  downloadImage: async (imageId, token) => {
    try {
      const instance = createAxiosInstance(token);
      const response = await instance.get(`/${imageId}/download`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw imageService.handleError(error);
    }
  },

  getImageMeta: async (userAuthId, token) => {
    try {
      const instance = createAxiosInstance(token);
      const response = await instance.get(`/user/${userAuthId}`);
      return response.data;
    } catch (error) {
      throw imageService.handleError(error);
    }
  },

  deleteImage: async (imageId, token) => {
    try {
      const instance = createAxiosInstance(token);
      const response = await instance.delete(`/${imageId}`);
      return response.data;
    } catch (error) {
      throw imageService.handleError(error);
    }
  },

  handleError: (error) => {
    if (error.response) {
      return {
        message: error.response.data?.message || 'Server error occurred',
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        message: 'No response from server. Please check your connection.',
        status: 503,
      };
    } else {
      return {
        message: error.message || 'Request setup error',
        status: 400,
      };
    }
  },
};

export default imageService;
