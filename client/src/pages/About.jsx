import { aboutImage } from "../assets/img";
import {
  FaRocket,
  FaShieldAlt,
  FaTruck,
  FaStar,
  FaSmile,
  FaTag,
} from "react-icons/fa";

const AboutUs = () => {
  const features = [
    {
      icon: <FaRocket className="text-blue-600 text-3xl" />,
      title: "Fast & Reliable",
      desc: "Enjoy blazing-fast delivery and a seamless shopping experience every time.",
    },
    {
      icon: <FaShieldAlt className="text-green-600 text-3xl" />,
      title: "Secure Checkout",
      desc: "Your data is safe with us thanks to top-tier encryption and secure payment gateways.",
    },
    {
      icon: <FaTag className="text-purple-600 text-3xl" />,
      title: "Unbeatable Deals",
      desc: "Get the best prices with frequent discounts and special ClickCart offers.",
    },
    {
      icon: <FaSmile className="text-pink-600 text-3xl" />,
      title: "Customer Happiness",
      desc: "We’re here 24/7 to make sure your ClickCart experience is perfect.",
    },
    {
      icon: <FaStar className="text-yellow-500 text-3xl" />,
      title: "Top-Rated Products",
      desc: "Curated, high-quality products that our customers love and trust.",
    },
    {
      icon: <FaTruck className="text-red-500 text-3xl" />,
      title: "Nationwide Delivery",
      desc: "We deliver all across the country, no matter where you are.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Intro Section */}
      <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img src={aboutImage} alt="About Us" className="w-full h-auto " />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              About Us
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              We are a passionate team dedicated to delivering high-quality
              products and services. Our mission is to create meaningful
              solutions that make life easier and more enjoyable.
            </p>
            <p className="text-gray-600 text-lg">
              Founded in 2025, our company focuses on innovation, customer
              satisfaction, and building long-term relationships.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-gray-50 shadow-md rounded-2xl p-8 hover:shadow-lg transition duration-300">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At ClickCart, we aim to redefine online shopping by offering a
              platform that’s intuitive, efficient, and trustworthy. Our goal is
              to empower customers with choice, convenience, and confidence in
              every purchase.
            </p>
          </div>
          <div className="bg-gray-50 shadow-md rounded-2xl p-8 hover:shadow-lg transition duration-300">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">
              Why ClickCart?
            </h2>
            <ul className="space-y-3 text-gray-600 list-disc list-inside">
              <li>Carefully curated products</li>
              <li>Responsive and friendly customer service</li>
              <li>Easy-to-use platform with secure checkout</li>
              <li>Exciting deals all year round</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-12">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md p-6 transition-all duration-300 text-center"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="text-center py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-2">
          Thank you for choosing{" "}
          <span className="text-blue-600">ClickCart</span>!
        </h3>
        <p className="text-gray-600 max-w-xl mx-auto mt-2">
          We’re committed to making every click count. From browsing to
          checkout, your satisfaction is our priority. Let’s make shopping
          delightful together.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
