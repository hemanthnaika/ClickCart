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
    </div>
  );
};

export default AboutUs;
