// userStorage.js

const USER_KEY = "user";

// Lưu thông tin người dùng vào localStorage
export const setUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Lấy thông tin người dùng từ localStorage
export const getUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

// Xóa thông tin người dùng khỏi localStorage (đăng xuất)
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};
