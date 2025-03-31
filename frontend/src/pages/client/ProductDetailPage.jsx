import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/client/productService'; 

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product details.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleBuyNow = () => {
        alert(`You have chosen to buy: ${product.name}`);
    };

    if (loading) return <div className="text-center text-lg font-semibold mt-10">Loading...</div>;
    if (error) return <div className="text-center text-red-500 font-semibold mt-10">{error}</div>;

    return (
        <div className="product-detail-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">{product.name}</h1>
            <p className="text-lg text-gray-700 mb-2"><strong>Price:</strong> ${product.price}</p>
            <p className="text-gray-600 mb-4"><strong>Description:</strong> {product.description}</p>
            <p className="text-gray-600 mb-4"><strong>Brand:</strong> {product.brand_id}</p>
            <button 
                onClick={handleBuyNow} 
                className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
            >
                Buy Now
            </button>
            <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full max-w-sm mx-auto mb-6 rounded-lg shadow-md"
            />

            <h2 className="text-xl font-semibold mb-4 text-gray-800">Specifications</h2>
            <ul className="space-y-2">
                <li><strong>Operating System:</strong> {product.operating_system}</li>
                <li><strong>Languages:</strong> {product.languages}</li>
                <li><strong>Display Type:</strong> {product.display_type}</li>
                <li><strong>Display Size:</strong> {product.display_size}</li>
                <li><strong>Resolution:</strong> {product.display_resolution}</li>
                <li><strong>Touch Technology:</strong> {product.touch_technology}</li>
                <li><strong>Rear Camera:</strong> {product.rear_camera}</li>
                <li><strong>Front Camera:</strong> {product.front_camera}</li>
                <li><strong>Video Recording:</strong> {product.video_recording}</li>
                <li><strong>Flash:</strong> {product.flash}</li>
                <li><strong>Camera Features:</strong> {product.camera_features}</li>
                <li><strong>CPU Speed:</strong> {product.cpu_speed}</li>
                <li><strong>CPU Cores:</strong> {product.cpu_cores}</li>
                <li><strong>Chipset:</strong> {product.chipset}</li>
                <li><strong>GPU:</strong> {product.gpu}</li>
                <li><strong>RAM:</strong> {product.ram}</li>
                <li><strong>Internal Storage:</strong> {product.internal_storage}</li>
                <li><strong>Expandable Storage:</strong> {product.expandable_storage}</li>
                <li><strong>Design:</strong> {product.design}</li>
                <li><strong>Dimensions:</strong> {product.dimensions}</li>
                <li><strong>Weight:</strong> {product.weight} grams</li>
                <li><strong>Battery Type:</strong> {product.battery_type}</li>
                <li><strong>Battery Capacity:</strong> {product.battery_capacity}</li>
                <li><strong>Fast Charging:</strong> {product.fast_charging}</li>
                <li><strong>Wireless Charging:</strong> {product.wireless_charging}</li>
                <li><strong>SIM Type:</strong> {product.sim_type}</li>
                <li><strong>SIM Slot:</strong> {product.sim_slot}</li>
                <li><strong>Wi-Fi:</strong> {product.wifi}</li>
                <li><strong>GPS:</strong> {product.gps}</li>
                <li><strong>Bluetooth:</strong> {product.bluetooth}</li>
                <li><strong>GPRS/EDGE:</strong> {product.gprs_edge}</li>
                <li><strong>Phone Jack:</strong> {product.phone_jack}</li>
                <li><strong>NFC:</strong> {product.nfc}</li>
                <li><strong>USB:</strong> {product.usb}</li>
                <li><strong>Charging Port:</strong> {product.charging_port}</li>
            </ul>

            
        </div>
    );
};

export default ProductDetailPage;