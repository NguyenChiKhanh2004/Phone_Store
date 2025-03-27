// src/layouts/ClientLayout.jsx
import Navbar from "../components/HeaderComponent";
import Footer from "../components/FooterComponent";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
