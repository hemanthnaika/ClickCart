import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import CheckoutButton from "../components/Checkout";
import { useSelector } from "react-redux";
import ImageKit from "../components/ImgKit";

const CheckoutPage = () => {
  const items = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user?.user);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: "IN",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    delivery: "Home",
  });

  // Prefill name if user has one
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        phone: prev.phone || user.phoneNumber || "",
        address: prev.address || user.address || "",
        city: prev.city || user.city || "",
        zipCode: prev.zipCode || user.zipCode || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const shippingAddress = `${formData.fullName}, +${formData.countryCode} ${formData.phone}, ${formData.address}, ${formData.city}, ${formData.zipCode}, Delivery: ${formData.delivery}`;

  const isFormComplete =
    formData.fullName.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.zipCode.trim() !== "";

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-2xl font-semibold">Please Login First</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 py-10">
          {/* Billing Address */}
          <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="text-sm ">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full border p-3 rounded-md mt-2"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="">
                <label htmlFor="phone" className="text-sm">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="phone"
                  placeholder="+91 000 000 0000"
                  className="w-full border p-3 rounded-md mt-1"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="address">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="w-full border p-3 rounded-md mt-1"
                  value={formData.address}
                  onChange={handleChange}
                  rows={"3"}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-3">
                <div>
                  <label htmlFor="city" className="text-sm">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="border p-3 rounded-md mt-1 w-full"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="city" className="text-sm">
                    Zip / Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="zipCode"
                    placeholder="Zip / Postal Code"
                    className="border p-3 rounded-md md:col-span-2 mt-1 w-full"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="delivery"
                    value="Home"
                    checked={formData.delivery === "Home"}
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  <span>Home</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="delivery"
                    value="Office"
                    checked={formData.delivery === "Office"}
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  <span>Office (10AM to 5PM)</span>
                </label>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-start border-b pb-4 mb-4"
              >
                <ImageKit
                  src={item.imageUrl[0]}
                  alt={item.name}
                  className={"w-10 h-10 rounded-md"}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium truncate w-52">{item.name}</h4>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-green-600 font-semibold">
                      ₹{item.price}
                    </p>
                    <p className="font-semibold">x{item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Totals */}
            <div className="space-y-1 text-right">
              <p className="font-medium">
                Subtotal: <span className="ml-2">₹ {totalPrice}</span>
              </p>
              <p className="font-medium">
                Shipping Fee: <span className="ml-2">Free</span>
              </p>
              <p className="font-bold text-lg">
                Total: <span className="ml-2">₹ {totalPrice}</span>
              </p>
            </div>

            {/* Checkout Button */}
            <div className="mt-6">
              {isFormComplete ? (
                <CheckoutButton
                  amount={totalPrice}
                  shippingAddress={shippingAddress}
                  paymentMethod={"Razorpay"}
                  userId={user?._id}
                  totalPrice={totalPrice}
                  items={items.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                  }))}
                />
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-3 rounded-md opacity-50 cursor-not-allowed"
                >
                  Fill all details to enable checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
