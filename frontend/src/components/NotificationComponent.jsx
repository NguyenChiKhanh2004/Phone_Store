import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ModalNotification = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-2xl p-6 w-[400px] shadow-lg relative"
      >
        <button
          onClick={onClose} // Đóng modal, không reload trang
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <div className="text-center">
          <h2 className="text-red-600 text-2xl font-bold">Smember</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1904/1904425.png"
            alt="logo"
            className="w-16 mx-auto my-2"
          />
          <p className="text-gray-600">
            Vui lòng đăng nhập tài khoản Smember để xem ưu đãi và thanh toán dễ dàng hơn.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={(e) => {
                onClose();
                navigate("/register");
              }}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50"
            >
              Đăng ký
            </button>
            <button
              onClick={(e) => {
                onClose();
                navigate("/login");  
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModalNotification;
