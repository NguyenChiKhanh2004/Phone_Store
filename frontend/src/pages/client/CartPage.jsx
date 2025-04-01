import React, { useState, useEffect } from 'react';
import { getCart, setCart } from '../../utils/cartStorage';
import { setCheckoutItems } from '../../utils/checkOutStorage';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy dữ liệu giỏ hàng từ localStorage và gán thêm thuộc tính selected mặc định là false
        const storedCart = getCart();
        const updatedCart = storedCart.map(item => ({ ...item, selected: false }));
        setCartItems(updatedCart);
    }, []);

    // Tính tổng tiền của các sản phẩm đã được chọn
    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + (item.selected ? item.price * item.quantity : 0);
    }, 0);

    // Xóa sản phẩm khỏi giỏ hàng dựa theo variant_id
    const handleRemoveItem = (variantId) => {
        const updatedCart = cartItems.filter(item => item.variant_id !== variantId);
        setCartItems(updatedCart);
        setCart(updatedCart);
    };

    // Thay đổi trạng thái chọn của sản phẩm
    const handleCheckboxChange = (variantId) => {
        const updatedCart = cartItems.map(item => 
            item.variant_id === variantId ? { ...item, selected: !item.selected } : item
        );
        setCartItems(updatedCart);
    };

    // Tăng số lượng sản phẩm
    const handleIncreaseQuantity = (variantId) => {
        const updatedCart = cartItems.map(item => {
            if (item.variant_id === variantId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
        setCart(updatedCart);
    };

    // Giảm số lượng sản phẩm (không cho phép giảm dưới 1)
    const handleDecreaseQuantity = (variantId) => {
        const updatedCart = cartItems.map(item => {
            if (item.variant_id === variantId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
        setCart(updatedCart);
    };

    // Khi bấm "Đặt hàng"
    const handlePlaceOrder = () => {
        // Lấy các sản phẩm đã được chọn
        const itemsForCheckout = cartItems.filter(item => item.selected);
        if(itemsForCheckout.length === 0) {
            alert("Vui lòng chọn ít nhất 1 sản phẩm để đặt hàng.");
            return;
        }
        // Lưu các sản phẩm được chọn vào checkoutStorage
        setCheckoutItems(itemsForCheckout);
        // Chuyển hướng đến trang checkout
        navigate('/checkout');
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                                    Select
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                                    Quantity
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <tr key={item.variant_id}>
                                    <td className="px-6 py-4 text-center">
                                        <input 
                                            type="checkbox" 
                                            checked={item.selected || false}
                                            onChange={() => handleCheckboxChange(item.variant_id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 flex items-center">
                                        <img
                                            src={item.image_url}
                                            alt={`Product ${item.variant_id}`}
                                            className="w-16 h-16 object-cover rounded mr-4"
                                        />
                                        <span className="text-gray-700">{item.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">${item.price}</td>
                                    <td className="px-6 py-4 text-gray-700 flex items-center">
                                        <button
                                            onClick={() => handleDecreaseQuantity(item.variant_id)}
                                            className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncreaseQuantity(item.variant_id)}
                                            className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        ${item.price * item.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleRemoveItem(item.variant_id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-6 flex flex-col md:flex-row md:justify-end items-center gap-4">
                        <div className="text-xl font-bold text-gray-800">
                            Total: ${totalPrice}
                        </div>
                        <button
                            onClick={handlePlaceOrder}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                        >
                            Đặt hàng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
