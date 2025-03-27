import api from '../services';

export const getUsers = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};