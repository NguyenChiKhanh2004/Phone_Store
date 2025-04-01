import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/client/productService';
// Import các hàm từ cartStorage
import { addToCart } from '../../utils/cartStorage'; // Giả sử file cartStorage.js nằm trong thư mục utils

const ProductDetailPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null); // chứa cả product và variants
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // State để lưu trữ hình ảnh đang hiển thị
    const [selectedImage, setSelectedImage] = useState(null);
    // State để lưu trữ thông tin của variant được chọn
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await getProductById(id);
                setData(result);
                // Khi dữ liệu product load, khởi tạo selectedImage là hình ảnh của product
                setSelectedImage(result.product.image_url);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product details.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleBuyNow = () => {
        alert(`You have chosen to buy: ${data.product.name}`);
    };

    const handleAddToCart = () => {
        // Kiểm tra xem đã chọn variant chưa
        if (!selectedVariant) {
            alert("Hãy chọn sản phẩm");
            return;
        }
        // Kiểm tra số lượng của variant
        if (selectedVariant.quantity <= 0) {
            alert("Sản phẩm đã hết hàng");
            return;
        }
        // Tạo đối tượng cartItem chứa thông tin cần lưu
        const cartItem = {
            name: product.name,
            variant_id: selectedVariant.id,
            quantity: 1, // Bạn có thể cho phép thay đổi số lượng sau
            price: selectedVariant.price,
            image_url: selectedVariant.image_url
        };

        // Sử dụng hàm addToCart từ cartStorage
        addToCart(cartItem);
        alert(`Sản phẩm ${data.product.name} đã được thêm vào giỏ hàng!`);
    };

    if (loading)
        return (
            <div className="text-center text-lg font-semibold mt-10">Loading...</div>
        );
    if (error)
        return (
            <div className="text-center text-red-500 font-semibold mt-10">{error}</div>
        );
    if (!data)
        return (
            <div className="text-center text-red-500 font-semibold mt-10">
                Product not found.
            </div>
        );

    const { product, variants } = data;

    return (
        <div className="product-detail-page max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">{product.name}</h1>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Cột bên trái: Hình ảnh và bảng thông tin chung */}
                <div className="md:w-1/2">
                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="w-full md:w-96 mb-4 rounded-lg shadow-md object-cover"
                    />

                    <p className="text-2xl font-bold mt-2 text-red-500">
                        Price: ${selectedVariant ? selectedVariant.price : product.price}
                    </p>

                    <table className="w-full text-sm border border-gray-200 mt-4">
                        <tbody>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Operating System</td>
                                <td className="p-2">{product.operating_system}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Languages</td>
                                <td className="p-2">{product.languages}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Display Type</td>
                                <td className="p-2">{product.display_type}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Display Size</td>
                                <td className="p-2">{product.display_size}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Resolution</td>
                                <td className="p-2">{product.display_resolution}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Camera (Rear/Front)</td>
                                <td className="p-2">
                                    {product.rear_camera} / {product.front_camera}
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">CPU</td>
                                <td className="p-2">
                                    {product.cpu_speed} - {product.cpu_cores} cores
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">RAM</td>
                                <td className="p-2">{product.ram}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Internal Storage</td>
                                <td className="p-2">{product.internal_storage}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Battery</td>
                                <td className="p-2">
                                    {product.battery_type} - {product.battery_capacity}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Cột bên phải: Nút Thêm vào giỏ hàng và danh sách variants */}
                <div className="md:w-1/2">
                    <button
                        onClick={handleAddToCart}
                        className="mb-4 w-60 bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-200 ease-in-out"
                    >
                        Thêm vào giỏ hàng
                    </button>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Các phiên bản hiện có
                    </h2>
                    {variants.length > 0 ? (
                        <div className="flex flex-col gap-3 max-w-xs">
                            {variants.map((variant) => (
                                <div
                                    key={variant.id}
                                    onClick={() => {
                                        if (variant.image_url) {
                                            setSelectedImage(variant.image_url);
                                        }
                                        setSelectedVariant(variant);
                                    }}
                                    className={`p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 flex items-center gap-4
                                        ${selectedVariant && selectedVariant.id === variant.id ? 'bg-blue-100' : ''}`}
                                >
                                    <p className="text-sm">
                                        <strong>Màu:</strong> {variant.color}
                                    </p>
                                    <p className="text-sm">
                                        <strong>RAM:</strong> {variant.ram}
                                    </p>
                                    <p className="text-sm">
                                        <strong>ROM:</strong> {variant.rom}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">Hết hàng</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
