import api from '../services';

export const getProducts = async () => {
  try {
    const response = await api.get('/product');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/product/${id}`);
    console.log(response)
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw error;
  }
};

export const searchProducts = async (name) => {
  try {
    const response = await api.post('/product/search', { name });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const getProductsByBrand = async (brand) => {
  try {
    const response = await api.post('/product/brand', { brand });
    return response.data;
  } catch (error) {
    console.error('Error fetching products by brand:', error);
    throw error;
  }
};
