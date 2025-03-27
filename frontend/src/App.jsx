import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientRoutes from "./routes/clientRoutes";
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import UserPage from "./pages/admin/UserPage";
// import AdminRoutes from "./routes/adminRoutes";
// import { UserPage } from "./pages/admin/UserPage";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/*" element={<ClientRoutes />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          {/* <Route path="" element={<AdminRoutes />} /> */}
          <Route path="user" element={<UserPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
