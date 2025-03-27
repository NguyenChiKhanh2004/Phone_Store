import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Giới thiệu */}
          <div>
            <h3 className="text-xl font-bold mb-4">Giới thiệu</h3>
            <p className="text-gray-400">
              Chúng tôi là cửa hàng điện thoại uy tín, cung cấp các sản phẩm chất lượng với giá cả
              phải chăng.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="/" className="hover:text-white">
                  Trang chủ
                </a>
              </li>
              <li className="mb-2">
                <a href="/products" className="hover:text-white">
                  Sản phẩm
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:text-white">
                  Về chúng tôi
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-white">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <ul className="text-gray-400">
              <li className="mb-2">Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</li>
              <li className="mb-2">Điện thoại: 0123 456 789</li>
              <li className="mb-2">Email: support@phone-store.com</li>
            </ul>
          </div>

          {/* Mạng xã hội */}
          <div>
            <h3 className="text-xl font-bold mb-4">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-youtube text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2023 Phone Store. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;