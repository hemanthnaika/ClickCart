import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import LoginModal from "../pages/Login";
import { navLink } from "../constants/constants";
import { user } from "../assets/img";
import { logout } from "../features/authSlice";
import { clearCart } from "../features/cartSlice";
import { signOut } from "../api/auth";
import ImageKit from "../components/ImgKit";

const useSearchProducts = (query) => {
  return useQuery({
    queryKey: ["products", "search", query],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/products/search?q=${query}`
      );

      return data.data;
    },
    enabled: !!query,
  });
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cart.items);
  const isAdmin = useSelector((state) => state.auth.user?.user?.isAdmin);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: products, isLoading } = useSearchProducts(debouncedTerm);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    mutation.mutate();
  };

  const mutation = useMutation({
    mutationFn: signOut,
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(logout());
      dispatch(clearCart());
      window.location.reload();
      setShowMenu(false);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";
      toast.error(errorMessage);
    },
  });

  const handleSearchClick = (id) => {
    setSearchTerm("");
    navigate(`/products/${id}`);
  };

  return (
    <>
      <nav
        className={`w-full transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/80  shadow-md"
            : "bg-white"
        } flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4`}
      >
        <Link to="/">
          <h1 className="font-bold text-2xl tracking-tight">
            <span className="text-blue-500">C</span>lickCart
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-8 font-bold">
          {navLink.map((link) => (
            <Link key={link.name} to={link.link}>
              {link.name}
            </Link>
          ))}
          {isAdmin && <Link to="/admin">Admin</Link>}

          {/* Search */}
          <div className="relative hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path
                d="M10.836 10.615 15 14.695"
                stroke="#7A7B7D"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                clipRule="evenodd"
                d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                stroke="#7A7B7D"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>

            {debouncedTerm && (
              <div className="absolute top-12 left-0 bg-white w-96 border mt-2 rounded shadow max-h-60 overflow-y-auto z-50">
                {isLoading ? (
                  <p className="p-4 text-gray-500">Searching...</p>
                ) : products?.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product._id}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 "
                      onClick={() => handleSearchClick(product._id)}
                    >
                      <ImageKit
                        src={product.imageUrl[0]}
                        alt={product.name}
                        className="w-10 h-10"
                      />
                      <p className="truncate "> {product.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-gray-500">No products found</p>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          {isAuthenticated && (
            <Link to="/cart">
              <div className="relative cursor-pointer">
                <svg width="18" height="18" fill="none" viewBox="0 0 14 14">
                  <path
                    d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                    stroke="#615fff"
                  />
                </svg>
                <span className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              </div>
            </Link>
          )}

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <img
                src={user}
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
                alt="User"
              />
              {showMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  <Link to="/profile">
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Profile
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <LoginModal />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          className="sm:hidden"
        >
          <svg width="21" height="15" fill="none" viewBox="0 0 21 15">
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect
              x="6"
              y="13"
              width="15"
              height="1.5"
              rx=".75"
              fill="#426287"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-center gap-2 px-5 text-xl md:hidden z-50">
            {navLink.map((link) => (
              <Link
                key={link.name}
                to={link.link}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated && (
              <Link to="/cart" onClick={() => setOpen(false)}>
                Cart ({items.length})
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="text-sm text-red-600 mt-2"
              >
                Logout
              </button>
            ) : (
              <LoginModal />
            )}
          </div>
        )}
      </nav>

      {/* Mobile Search */}
      <div className="sm:hidden relative mt-2 px-10 ">
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-full outline-none"
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {debouncedTerm && (
          <div className="absolute left-0 mx-2  bg-white w-full border mt-2 rounded shadow max-h-60 overflow-y-auto z-50">
            {isLoading ? (
              <p className="p-4 text-gray-500">Searching...</p>
            ) : products?.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 "
                  onClick={() => handleSearchClick(product._id)}
                >
                  <ImageKit
                    src={product.imageUrl[0]}
                    alt={product.name}
                    className="w-10 h-10"
                  />
                  <p className="truncate "> {product.name}</p>
                </div>
              ))
            ) : (
              <p className="p-4 text-gray-500">No products found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
