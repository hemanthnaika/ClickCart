import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login, signUp } from "../api/auth";
import { setUser } from "../features/authSlice";
import toast from "react-hot-toast";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: isLogin ? login : signUp,
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(setUser(data.user));
      window.location.reload();
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";
      toast.error(errorMessage);
    },
  });

  if (!isOpen) return null;

  console.log(isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (isLogin) {
      mutation.mutate({
        email: formData.get("email"),
        password: formData.get("password"),
      });
    } else {
      mutation.mutate({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
    }
  };
  return (
    <div className="absolute md:inset-0  md:bg-black/50 z-50 flex items-center justify-center  h-screen">
      <div className="bg-white max-w-md w-full rounded-2xl p-6 relative shadow-lg animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-7 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          ✕
        </button>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center text-gray-900 mt-4">
          {isLogin ? "Login" : "Register"}
        </h1>
        <p className="text-gray-500 text-center text-sm mt-1">
          {isLogin ? "Please sign in to continue" : "Create your account"}
        </p>

        {/* Form */}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2">
            <svg
              width="16"
              height="11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="bg-transparent w-full text-sm text-gray-700 placeholder-gray-500 outline-none"
            />
          </div>

          {/* Name field only in Register */}
          {!isLogin && (
            <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent w-full text-sm text-gray-700 placeholder-gray-500 outline-none"
              />
            </div>
          )}

          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2">
            <svg
              width="13"
              height="17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="bg-transparent w-full text-sm text-gray-700 placeholder-gray-500 outline-none"
            />
          </div>

          {/* Forgot password (only in login) */}
          {isLogin && (
            <div className="text-right text-indigo-500 text-sm">
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button
            type="submit"
            className="w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
            disabled={mutation.isPending}
          >
            {isLogin
              ? mutation.isPending
                ? "Logging in..."
                : "Login"
              : mutation.isPending
              ? "Registering..."
              : "Register"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-3">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-500 hover:underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
