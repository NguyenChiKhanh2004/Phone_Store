import { Routes, Route } from "react-router-dom";
import Login from "../pages/LoginPage";
import Home from "../pages/client/HomePage";
import Register from "../pages/RegisterPage";
import ProductDetailPage from "../pages/client/ProductDetailPage";
import CartPage from "../pages/client/CartPage";
// import CheckOutPage from "../pages/client/checkOutPage";
import CheckOutPage from "../pages/client/CheckOutPage";
import HistoryOrderPage from "../pages/client/HistoryOrderPage";

export default function ClientRoutes() {
  return (
    <Routes>

      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="products/:id" element={<ProductDetailPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckOutPage />} />
      <Route path="history" element={<HistoryOrderPage />} />

    </Routes>
  );
}
