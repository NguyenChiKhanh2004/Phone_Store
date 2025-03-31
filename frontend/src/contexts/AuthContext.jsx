import { createContext, useContext, useState, useEffect } from "react";
// import { getProfile } from "../services/authservices";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   getProfile()
  //     .then((userData) => {
  //       setUser(userData);
  //       setIsAuthenticated(true);
  //     })
  //     .catch(() => {
  //       setUser(null);
  //       setIsAuthenticated(false);
  //     });
  // }, []);

  const login = (userInfo) => {
    setUser(userInfo);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
