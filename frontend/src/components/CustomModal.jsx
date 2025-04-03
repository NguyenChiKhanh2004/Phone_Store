import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomModal = ({ isOpen, onClose, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 50, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="bg-white rounded-lg p-5 shadow-lg w-96 mt-10">
            <h2 className="text-lg font-semibold text-center mb-3">Thông báo</h2>
            <p className="text-center text-gray-700">{message}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={onClose}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Đóng
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
