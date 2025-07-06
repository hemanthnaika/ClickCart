import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { headphone, macbook, playstation } from "../assets/img";

const slides = [
  {
    id: 1,
    title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
    subtitle: "   Limited Time Offer 30% Off",

    image: headphone,
  },

  {
    id: 2,
    title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
    subtitle: " Hurry up only few lefts!",

    image: playstation,
  },
  {
    id: 3,
    title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    subtitle: "Exclusive Deal 40% Off",

    image: macbook,
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-gray-100 overflow-hidden rounded-md">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-15 py-16 transition-all duration-1000">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <p className="text-sm uppercase text-pink-600 font-semibold tracking-widest">
            {slides[current].subtitle}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {slides[current].title}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
            <button className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition">
              Shop Now
            </button>
            <button className="bg-white text-pink-600 border border-pink-600 px-6 py-3 rounded-full hover:bg-pink-50 transition">
              Explore Deals
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0">
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-auto h-72 max-w-md mx-auto "
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
      >
        <ChevronRight />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === current ? "bg-pink-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
