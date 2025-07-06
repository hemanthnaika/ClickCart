import React, { useState, useRef, useEffect } from "react";
import LoginModal from "./AuthModal";

const UserProfile = ({ isAuthenticated, user, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  // Optional: Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {isAuthenticated ? (
        <img
          src={user}
          alt="User"
          className="w-8 h-8 bg-black rounded-full cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        />
      ) : (
        <LoginModal />
      )}

      {/* Logout Dropdown */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
