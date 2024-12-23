import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const productService = {
  getAllProducts: async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },

  createProduct: async (product) => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  },
};

export default productService;
