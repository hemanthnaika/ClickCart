import React, { useState } from "react";

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

        <div className="mt-12 grid items-center lg:grid-cols-2 gap-6 lg:gap-16">
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
            {/* Icon Block Example */}
            {[
              {
                title: "Knowledgebase",
                description: "We're here to help with any questions or code.",
                link: "Contact support",
              },
              {
                title: "FAQ",
                description:
                  "Search our FAQ for answers to anything you might ask.",
                link: "Visit FAQ",
              },
              {
                title: "Developer APIs",
                description: "Check out our development quickstart guide.",
                link: "Contact sales",
              },
              {
                title: "Contact us by email",
                description:
                  "If you wish to write us an email instead please use",
                link: "Send an email",
              },
            ].map((block, i) => (
              <div className="flex gap-x-7 py-6" key={i}>
                <svg
                  className="shrink-0 size-6 mt-1.5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
                <div className="grow">
                  <h3 className="font-semibold text-black">{block.title}</h3>
                  <p className="mt-1 text-sm text-gray-700">
                    {block.description}
                  </p>
                  <a
                    href="#"
                    className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-700 hover:text-black focus:outline-none"
                  >
                    {block.link}
                    <svg
                      className="shrink-0 size-2.5 transition ease-in-out group-hover:translate-x-1"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.975821 6.92249C0.43689 6.92249 0 7.34222 0 7.85999C0 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
