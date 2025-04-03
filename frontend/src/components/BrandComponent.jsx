// BrandList.jsx
import React, { useEffect, useState } from 'react';
import { getBrands } from '../services/client/brandService'; // Điều chỉnh đường dẫn nếu cần
import { useNavigate } from 'react-router-dom';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setError('Lỗi khi tải dữ liệu thương hiệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-row gap-2 overflow-x-auto p-2">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="p-2 border rounded shadow-sm min-w-[100px] text-center text-sm cursor-pointer hover:bg-gray-200"
          onClick={() => {
            // Chuyển hướng tương tự như tìm kiếm: chuyển đến Home với query parameter 'brand'
            navigate(`/?brand=${encodeURIComponent(brand.name)}`);
          }}
        >
          {brand.name}
        </div>
      ))}
    </div>
  );
};

export default BrandList;
