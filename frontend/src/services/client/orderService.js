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
