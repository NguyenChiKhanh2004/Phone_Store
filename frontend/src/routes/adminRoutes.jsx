import { Routes, Route } from "react-router-dom";
import UserPages from "../pages/admin/UserPage";

// import Admin from "../pages/admin/AdminPage";


export default function AdminRoutes() {
  return (
    <Routes>
        <Route path="user" element={<UserPages/>} />

        
    </Routes>
  );
}
