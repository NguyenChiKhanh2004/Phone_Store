import api from '../services';

export const getReview = async (productId) => {
    try {
        const response = await api.get(`/reviews/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews by product ID:', error);
        throw error;
    }
};


export const createReview = async (reviewData) => {
    try {
        const response = await api.post('/reviews', reviewData);
        return response.data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};
