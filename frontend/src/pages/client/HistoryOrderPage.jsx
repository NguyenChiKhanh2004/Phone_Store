import React, { useEffect, useState } from "react";
import { getOrderHistoryByUserId } from "../../services/client/orderService";
import { getUser } from "../../utils/userStoage";

const HistoryOrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const user = getUser();
                if (!user || !user.id) {
                    setError("Bạn cần đăng nhập để xem lịch sử mua hàng.");
                    setLoading(false);
                    return;
                }
                
                const data = await getOrderHistoryByUserId(user.id);
                setOrders(data);
            } catch (err) {
                setError("Không thể lấy dữ liệu lịch sử mua hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4">Lịch sử mua hàng</h2>
            {orders.length === 0 ? (
                <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.order_id} className="border p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">Đơn hàng #{order.order_id}</h3>
                            <p className="text-sm text-gray-600">Ngày đặt: {new Date(order.order_date).toLocaleDateString()}</p>
                            <p className="text-sm">Trạng thái: <span className="font-bold">{order.order_status}</span></p>
                            <p className="text-sm">Thanh toán: <span className="font-bold">{order.payment_status}</span></p>
                            <p className="text-sm">Tổng tiền: <span className="font-bold text-blue-600">{order.total.toLocaleString()} VND</span></p>
                            <div className="mt-2">
                                <h4 className="font-semibold">Sản phẩm:</h4>
                                <div className="flex gap-4 border-t pt-2 mt-2">
                                    <img src={order.image_url} alt={order.product_name} className="w-16 h-16 object-cover" />
                                    <div>
                                        <p className="font-medium">{order.product_name}</p>
                                        <p className="text-sm text-gray-500">{order.color} | {order.ram} RAM | {order.rom} ROM</p>
                                        <p className="text-sm">Số lượng: {order.quantity} | Giá: {order.price.toLocaleString()} VND</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryOrderPage;
