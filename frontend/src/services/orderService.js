import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const orderService = {
  createOrder: async (orderData) => {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  },
};

export default orderService;
