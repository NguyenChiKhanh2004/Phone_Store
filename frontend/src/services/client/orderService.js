import api from "../services";

export const createOrderDetail = async (orderData) => {
    try {
        const response = await api.post("/orders/createOrderDetail", orderData);
        return response.data;
    } catch (error) {
        console.error("Error creating order detail:", error.response?.data || error.message);
        throw error;
    }
};

export const getOrderHistoryByUserId = async (userId) => {
    try {
        const response = await api.get(`/orders/history/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order history:", error.response?.data || error.message);
        throw error;
    }
}
