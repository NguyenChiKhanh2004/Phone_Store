// import { Outlet } from "react-router-dom";

// const AdminLayout = () => {
//   return <Outlet />;
// };

// export default AdminLayout;
import { FaHome, FaBoxOpen, FaUsers, FaCog } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b flex items-center justify-center">
          <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2 px-4">
            <li className="hover:bg-blue-50 rounded-xl cursor-pointer">
              <Link to="/dashboard" className="flex items-center space-x-3 p-3">
                <FaHome className="text-blue-600" />
                <span className="text-gray-700 font-medium">Dashboard</span>
              </Link>
            </li>
            <li className="hover:bg-blue-50 rounded-xl cursor-pointer">
              <Link to="/product-management" className="flex items-center space-x-3 p-3">
                <FaBoxOpen className="text-blue-600" />
                <span className="text-gray-700 font-medium">Quản lý sản phẩm</span>
              </Link>
            </li>
            <li className="hover:bg-blue-50 rounded-xl cursor-pointer">
              <Link to="/admin/user" className="flex items-center space-x-3 p-3">
                <FaUsers className="text-blue-600" />
                <span className="text-gray-700 font-medium">Khách hàng</span>
              </Link>
            </li>
            <li className="hover:bg-blue-50 rounded-xl cursor-pointer">
              <Link to="/settings" className="flex items-center space-x-3 p-3">
                <FaCog className="text-blue-600" />
                <span className="text-gray-700 font-medium">Cài đặt</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Nội dung chính */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Xin chào, Admin</span>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


