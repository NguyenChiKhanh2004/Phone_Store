// cartStorage.js

const CART_KEY = "cart";

// Lấy dữ liệu giỏ hàng từ localStorage
export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error getting cart:", error);
    return [];
  }
};

// Lưu dữ liệu giỏ hàng vào localStorage
export const setCart = (cartItems) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
};

// Xóa giỏ hàng khỏi localStorage
export const removeCart = () => {
  localStorage.removeItem(CART_KEY);
};

// Thêm một item vào giỏ hàng
export const addToCart = (cartItem) => {
  const currentCart = getCart();
  // Nếu muốn kiểm tra item trùng lặp, có thể cập nhật số lượng ở đây.
  currentCart.push(cartItem);
  setCart(currentCart);
};
