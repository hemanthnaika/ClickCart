import React, { useState } from "react";
import { aboutImage } from "../assets/img";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Send formData to backend or email service
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8  mx-auto bg-white text-black">
      <div className="max-w-2xl lg:max-w-5xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-1 text-black/80">
            We'd love to talk about how we can help you.
          </p>
        </div>

        <div className="mt-12 grid  items-center lg:grid-cols-2 gap-6 lg:gap-16 ">
          <div className="flex flex-col border border-gray-300 rounded-xl p-4 sm:p-6 lg:p-8 bg-white">
            <h2 className="mb-8 text-xl font-semibold text-black">
              Fill in the form
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="py-2.5 px-4 w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="py-2.5 px-4 w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="py-2.5 px-4 w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
                  placeholder="Email"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="py-2.5 px-4 w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
                  placeholder="Phone Number"
                />
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={4}
                  className="py-2.5 px-4 w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
                  placeholder="Details"
                ></textarea>
              </div>
              <div className="mt-4 grid">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Send inquiry
                </button>
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-600">
                  We'll get back to you in 1-2 business days.
                </p>
              </div>
            </form>
          </div>

          <div className="divide-y divide-gray-300">
            <img src={aboutImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
