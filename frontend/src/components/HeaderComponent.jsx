// Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import ProtectedLink from "../routes/ProtectedLink";


const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleSearch = () => {
    // Chuyển hướng đến trang Home với query parameter search
    navigate(`/?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-wide">
          📱 PhoneStore
        </Link>

        {/* Thanh tìm kiếm */}
        <div className="flex-1 mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
            >
              Tìm
            </button>
          </div>
        </div>

        <nav>
          <ul className="flex space-x-8 text-lg font-medium">
            <li>
              <ProtectedLink to="/dashboard">Sản phẩm</ProtectedLink>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-6">
          <Link to="/cart" className="relative">
            <FaShoppingCart size={28} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2">
              3
            </span>
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-semibold">{user.full_name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition duration-200"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition duration-200"
            >
              <FaUser size={20} className="inline-block mr-2" />
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
