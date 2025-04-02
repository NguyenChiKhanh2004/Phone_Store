import api from '../services';

export const getBrands = async () => {
  try {
    const response = await api.get('/brands');
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error; 
  }
}