import { Routes, Route } from "react-router-dom";
import Login from "../pages/LoginPage";
import Home from "../pages/client/HomePage";
import Register from "../pages/RegisterPage";
import ProductDetailPage from "../pages/client/ProductDetailPage";

export default function ClientRoutes() {
  return (
    <Routes>

      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="products/:id" element={<ProductDetailPage />} />

    </Routes>
  );
}
