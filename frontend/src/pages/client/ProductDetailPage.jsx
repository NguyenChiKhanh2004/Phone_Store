import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/client/productService';
import { getReview, createReview } from '../../services/client/reviewService';
import { addToCart } from '../../utils/cartStorage';
import { FaStar } from 'react-icons/fa';
import { getUser } from '../../utils/userStoage';

import CustomModal from '../../components/CustomModal';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null); // chứa cả product và variants
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // State để lưu trữ hình ảnh đang hiển thị
    const [selectedImage, setSelectedImage] = useState(null);
    // State để lưu trữ thông tin của variant được chọn
    const [selectedVariant, setSelectedVariant] = useState(null);
    // State cho bình luận
    const [reviews, setReviews] = useState([]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");


    // Lấy thông tin user từ localStorage
    const user = getUser();

    // Khởi tạo newReview với user_id lấy từ localStorage (nếu có)
    const [newReview, setNewReview] = useState({
        product_id: id,
        user_id: user ? user.id : null, // nếu chưa đăng nhập sẽ là null
        rating: 0,
        title: '',
        comment: '',
        is_verified_purchase: false
    });

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

    // Load danh sách bình luận cho sản phẩm
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewData = await getReview(id);
                setReviews(reviewData);
            } catch (err) {
                console.error('Error fetching reviews:', err);
            }
        };

        fetchReviews();
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
            name: data.product.name,
            variant_id: selectedVariant.id,
            quantity: 1,
            price: selectedVariant.price,
            image_url: selectedVariant.image_url
        };

        addToCart(cartItem);
        // alert(`Sản phẩm ${data.product.name} đã được thêm vào giỏ hàng!`);

        setModalMessage(`Sản phẩm ${product.name} đã được thêm vào giỏ hàng!`);
        setIsModalOpen(true);
    };
    

    const handleReviewInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewReview((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!newReview.user_id) {
            alert("Vui lòng đăng nhập để gửi bình luận.");
            return;
        }
        try {
            const createdReview = await createReview(newReview);
            // Sau khi tạo thành công, cập nhật lại danh sách bình luận
            setReviews((prev) => [createdReview, ...prev]);
            // Reset form nếu cần
            setNewReview((prev) => ({
                ...prev,
                rating: 0,
                title: '',
                comment: '',
                is_verified_purchase: false
            }));
        } catch (err) {
            console.error('Error creating review:', err);
        }
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

                    <table className="w-full text-sm border border-gray-200">
                        <tbody>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">ID</td>
                                <td className="p-2">{product.id}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Name</td>
                                <td className="p-2">{product.name}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Slug</td>
                                <td className="p-2">{product.slug}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Description</td>
                                <td className="p-2">{product.description}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Price</td>
                                <td className="p-2">${product.price}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Brand ID</td>
                                <td className="p-2">{product.brand_id}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Image URL</td>
                                <td className="p-2">{product.image_url}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Status</td>
                                <td className="p-2">{product.status}</td>
                            </tr>
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
                                <td className="p-2 font-semibold">Display Color</td>
                                <td className="p-2">{product.display_color}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Display Standard</td>
                                <td className="p-2">{product.display_standard}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Display Size</td>
                                <td className="p-2">{product.display_size}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Display Resolution</td>
                                <td className="p-2">{product.display_resolution}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Touch Technology</td>
                                <td className="p-2">{product.touch_technology}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Rear Camera</td>
                                <td className="p-2">{product.rear_camera}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Front Camera</td>
                                <td className="p-2">{product.front_camera}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Video Recording</td>
                                <td className="p-2">{product.video_recording}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Flash</td>
                                <td className="p-2">{product.flash}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Camera Features</td>
                                <td className="p-2">{product.camera_features}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">CPU Speed</td>
                                <td className="p-2">{product.cpu_speed}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">CPU Cores</td>
                                <td className="p-2">{product.cpu_cores}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Chipset</td>
                                <td className="p-2">{product.chipset}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">GPU</td>
                                <td className="p-2">{product.gpu}</td>
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
                                <td className="p-2 font-semibold">Expandable Storage</td>
                                <td className="p-2">{product.expandable_storage}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Design</td>
                                <td className="p-2">{product.design}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Dimensions</td>
                                <td className="p-2">{product.dimensions}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Weight</td>
                                <td className="p-2">{product.weight} grams</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Battery Type</td>
                                <td className="p-2">{product.battery_type}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Battery Capacity</td>
                                <td className="p-2">{product.battery_capacity}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Fast Charging</td>
                                <td className="p-2">{product.fast_charging}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Wireless Charging</td>
                                <td className="p-2">{product.wireless_charging}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">SIM Type</td>
                                <td className="p-2">{product.sim_type}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">SIM Slot</td>
                                <td className="p-2">{product.sim_slot}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Wi-Fi</td>
                                <td className="p-2">{product.wifi}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">GPS</td>
                                <td className="p-2">{product.gps}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Bluetooth</td>
                                <td className="p-2">{product.bluetooth}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">GPRS/EDGE</td>
                                <td className="p-2">{product.gprs_edge}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Phone Jack</td>
                                <td className="p-2">{product.phone_jack}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">NFC</td>
                                <td className="p-2">{product.nfc}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">USB</td>
                                <td className="p-2">{product.usb}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Charging Port</td>
                                <td className="p-2">{product.charging_port}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2 font-semibold">Created At</td>
                                <td className="p-2">{product.created_at}</td>
                            </tr>
                            <tr>
                                <td className="p-2 font-semibold">Updated At</td>
                                <td className="p-2">{product.updated_at}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Cột bên phải: Nút Thêm vào giỏ hàng, danh sách variants và bình luận */}
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

                    {/* Phần bình luận */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Bình luận</h2>
                        {reviews.length > 0 ? (
                            <ul className="mb-4">
                                {reviews.map((review) => (
                                    <li key={review.id} className="border-b py-2">
                                        <p className="font-semibold">
                                            {review.title} <span className="text-sm text-gray-600">({review.rating} sao)</span>
                                        </p>
                                        <p>{review.comment}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 mb-4">Chưa có bình luận nào.</p>
                        )}

                        <form onSubmit={handleReviewSubmit} className="border p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Thêm bình luận mới</h3>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newReview.title}
                                    onChange={handleReviewInputChange}
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Bình luận</label>
                                <textarea
                                    name="comment"
                                    value={newReview.comment}
                                    onChange={handleReviewInputChange}
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Rating</label>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            size={24}
                                            className={`cursor-pointer transition-colors duration-200 ${newReview.rating >= star ? 'text-yellow-500' : 'text-gray-300'
                                                }`}
                                            onClick={() =>
                                                setNewReview((prev) => ({ ...prev, rating: star }))
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="mb-2 flex items-center">
                                <input
                                    type="checkbox"
                                    name="is_verified_purchase"
                                    checked={newReview.is_verified_purchase}
                                    onChange={handleReviewInputChange}
                                    className="mr-2"
                                />
                                <label className="text-sm">Xác nhận mua hàng</label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                            >
                                Bình luận
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={modalMessage}
            />
        </div>
    );
};

export default ProductDetailPage;
