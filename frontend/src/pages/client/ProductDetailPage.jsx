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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="product-detail-page">
            <h1>{product.name}</h1>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Brand:</strong> {product.brand_id}</p>
            <img src={product.image_url} alt={product.name} style={{ maxWidth: '300px' }} />

            <h2>Specifications</h2>
            <ul>
                <li><strong>Operating System:</strong> {product.operating_system}</li>
                <li><strong>Languages:</strong> {product.languages}</li>
                <li><strong>Display Type:</strong> {product.display_type}</li>
                <li><strong>Display Size:</strong> {product.display_size}</li>
                <li><strong>Resolution:</strong> {product.display_resolution}</li>
                <li><strong>Rear Camera:</strong> {product.rear_camera}</li>
                <li><strong>Front Camera:</strong> {product.front_camera}</li>
                <li><strong>CPU Speed:</strong> {product.cpu_speed}</li>
                <li><strong>RAM:</strong> {product.ram}</li>
                <li><strong>Internal Storage:</strong> {product.internal_storage}</li>
                <li><strong>Battery Capacity:</strong> {product.battery_capacity}</li>
                <li><strong>Fast Charging:</strong> {product.fast_charging}</li>
                <li><strong>Wireless Charging:</strong> {product.wireless_charging}</li>
                <li><strong>SIM Type:</strong> {product.sim_type}</li>
                <li><strong>Bluetooth:</strong> {product.bluetooth}</li>
                <li><strong>NFC:</strong> {product.nfc}</li>
                <li><strong>USB:</strong> {product.usb}</li>
            </ul>
        </div>
    );
};

export default ProductDetailPage;