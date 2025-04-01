import { createContext, useContext, useState, useEffect } from "react";
import { getUser, setUser as storageSetUser, removeUser } from "../utils/userStoage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Khi component mount, kiểm tra thông tin user từ localStorage
  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUserState(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userInfo) => {
    storageSetUser(userInfo);   // Lưu vào localStorage
    setUserState(userInfo);       // Cập nhật state
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeUser();               // Xóa khỏi localStorage
    setUserState(null);         // Cập nhật state
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
