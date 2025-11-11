const BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export const currencyApi = {
  getExchangeRate: async (baseCurrency = 'USD') => {
    try {
      const response = await fetch(`${BASE_URL}/${baseCurrency}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      throw error;
    }
  }
};