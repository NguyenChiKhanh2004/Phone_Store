import React from 'react';
import { Link } from "react-router-dom";

const ProductComponent = React.memo(({ product }) => {
  const { image_url, name, price } = product;


  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-white p-4 flex flex-col">
      <img
        src={image_url}
        alt={name}
        className="w-full h-48 object-contain rounded-lg"
      />
      <h2 className="text-base font-semibold mt-4 line-clamp-2">
        {name}
      </h2>
      
        <p className="text-lg text-red-500 font-bold mt-2">
          {parseFloat(price).toLocaleString('vi-VN')} đ
        </p>

        <Link
          to={`/products/${product.id}`}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-orange-600 transition duration-300 text-center"
        >
          Mua
        </Link>

        {/* Thông tin khuyến mãi */}
      <p className="text-sm text-gray-500 mt-2">
        Tặng: <span className="text-red-500">Miễn phí BHV lần thứ 5</span>, khi đã mua BHV lần thứ 4.
      </p>
      <p className="text-sm text-gray-500">
        (Quý khách <a href="#" className="text-blue-500 underline">Đăng nhập</a> để kiểm tra đơn hàng)
      </p>
    </div>
  );
});

export default ProductComponent;