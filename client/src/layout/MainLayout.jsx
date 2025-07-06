import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../hooks/useAuth";
import { useCategory } from "../hooks/useCategory";
import ScrollToTop from "../ScrollToTop";

const MainLayout = () => {
  useAuth();
  useCategory();
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Outlet />

      <Footer />
    </>
  );
};

export default MainLayout;
