import React, { useState, useEffect } from "react";
import { createOrderDetail } from "../../services/client/orderService";
import { getCheckoutItems } from "../../utils/checkOutStorage";
import { getUser } from "../../utils/userStoage";

const user = getUser();
    const userID = user?.id; // Lấy userId từ localStorage hoặc mặc định là 1

export default function CheckOutPage() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    userId: userID || 1, // Lấy userId từ localStorage hoặc mặc định là 1
    shippingAddress: "",
    billingAddress: "",
    notes: "",
    paymentMethod: "shipcod", // Mặc định là shipcod
    itemsJson: [], // Sẽ được cập nhật từ checkoutStorage
  });
  // tesst
  // Khi component mount, lấy dữ liệu từ checkoutStorage và cập nhật vào formData
  useEffect(() => {
    const checkoutItems = getCheckoutItems();
    if (checkoutItems && checkoutItems.length > 0) {
      setFormData((prev) => ({
        ...prev,
        itemsJson: checkoutItems,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      const orderData = {
        ...formData,
        itemsJson: JSON.stringify(formData.itemsJson), // Đảm bảo JSON đúng định dạng khi gửi đi
      };

      const response = await createOrderDetail(orderData);
      setSuccessMessage("Đặt hàng thành công!");

      console.log("Order response:", response);

      // Reset form sau khi đặt hàng thành công
      setFormData({
        userId: 1,
        shippingAddress: "",
        billingAddress: "",
        notes: "",
        paymentMethod: "shipcod",
        itemsJson: [],
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Lỗi khi tạo đơn hàng!");
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trang thông tin đặt hàng</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Địa chỉ giao hàng</label>
          <input
            type="text"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Nhập địa chỉ giao hàng"
          />
        </div>
        <div>
          <label className="block text-gray-700">Địa chỉ nhận hàng</label>
          <input
            type="text"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Nhập địa chỉ nhận hàng"
          />
        </div>
        <div>
          <label className="block text-gray-700">Ghi chú</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Ghi chú thêm nếu có"
          />
        </div>
        <div>
          <label className="block text-gray-700">Hình thức thanh toán</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="shipcod">Thanh toán khi nhận hàng</option>
            <option value="PayPal">Thanh toán trực tuyến</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Đặt hàng"}
        </button>
      </form>
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
}
