import api from "./api";

export const productService = {
  getAllProducts: () => api.get("/products"),
  createProduct: (product) => api.post("/products", product),
};
