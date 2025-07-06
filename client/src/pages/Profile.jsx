import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Profile = () => {
  const { refetch } = useAuth();
  const user = useSelector((state) => state.auth.user?.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/users/update/${user._id}`,
        formData,
        { withCredentials: true }
      );
      refetch();
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect if not logged in
    }
  }, [user, navigate]);

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-indigo-600 hover:underline text-sm flex items-center gap-1"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 12L5.5 8L9.5 4"
            stroke="#4f46e5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </button>

      <h2 className="text-3xl font-bold mb-6">Your Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            readOnly
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded outline-none cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            type="text"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="10-digit number"
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
          ></textarea>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
