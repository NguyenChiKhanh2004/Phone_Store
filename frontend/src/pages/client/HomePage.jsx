// pages/Home.jsx
import React, { useState, useEffect } from 'react';
import ProductComponent from '../../components/ProductComponent';
import { getProducts } from '../../services/client/productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const [error, setError] = useState(null); // Thêm trạng thái lỗi
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.'); // Hiển thị thông báo lỗi
      } finally {
        setLoading(false); // Dừng loading dù có lỗi hay không
      }
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8 auto-rows-fr">
        {getPaginatedProducts().map((product) => (
          <div key={product.id} className="flex flex-col min-h-[400px]">
            <ProductComponent product={product} />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition duration-300"
        >
          Trang trước
        </button>

        {/* Hiển thị số trang */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } rounded-lg hover:bg-gray-300 transition duration-300`}
          >
            {index + 1}
          </button>
        ))}

        {/* Nút trang sau */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition duration-300"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default Home;