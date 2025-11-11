const BASE_URL = 'https://fakestoreapi.com';

export const productApi = {
  getAllProducts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};