// src/layouts/ClientLayout.jsx
import Navbar from "../components/HeaderComponent";
import Footer from "../components/FooterComponent";
import { Outlet } from "react-router-dom";
import ChatBox from "../components/ChatBoxComponent";

const ClientLayout = () => {
  return (
    <>
      <Navbar />
      <ChatBox />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
