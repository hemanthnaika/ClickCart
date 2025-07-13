import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import Home from "./pages/Home.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Products from "./pages/Products.jsx";
import Product from "./pages/Product.jsx";
import Carts from "./pages/Carts.jsx";
import Error from "./pages/Error.jsx";
import { store } from "./store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Admin from "./pages/Admin/Admin.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import AddCategory from "./components/Admin/AddCategory.jsx";
import AddProduct from "./components/Admin/AddProduct.jsx";
import AllCategory from "./components/Admin/AllCategory.jsx";
import AllProduct from "./components/Admin/AllProduct.jsx";

import ProductsByCategory from "./pages/Categories.jsx";

import Profile from "./pages/Profile.jsx";
import Checkout from "./pages/Checkout.jsx";
import Order from "./pages/Order.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import About from "./pages/About.jsx";
import ContactUs from "./pages/Contact.jsx";
import Orders from "./components/Admin/Orders.jsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "/categories/:id",
        element: <ProductsByCategory />,
      },
      {
        path: "/cart",
        element: <Carts />,
      },
      {
        path: "/Checkout",
        element: <Checkout />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/orders",
        element: <Order />,
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
      },

      {
        element: <AdminRoute />, // your protected wrapper
        children: [
          {
            path: "/admin",
            element: <Admin />, // loads the layout
            children: [
              { path: "", element: <Dashboard /> }, // Admin dashboard default
              { path: "add-category", element: <AddCategory /> },
              { path: "edit-category/:id", element: <AddCategory /> },
              { path: "add-product", element: <AddProduct /> },
              { path: "edit-product/:id", element: <AddProduct /> },
              { path: "all-categories", element: <AllCategory /> },
              { path: "all-products", element: <AllProduct /> },
              { path: "all-orders", element: <Orders /> },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  </Provider>
);
