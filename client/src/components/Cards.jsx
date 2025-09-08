import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../features/cartSlice";
import ImageKit from "./ImgKit";
import { toast } from "react-hot-toast";

const Cards = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  if (!product) return null;

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    toast.success(`"${product.name}" added to cart!`);
    dispatch(addToCart(product)); // Add to redux + localStorage
    navigate("/cart");
  };

  return (
    <div
      onClick={handleCardClick}
      className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[220px] hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative w-full h-40 flex items-center justify-center rounded-md overflow-hidden">
        {/* Blurred background */}
        <img
          src={product.imageUrl[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
        />
        {/* Main image */}
        <ImageKit
          className="relative z-10 max-h-full max-w-full object-contain transition"
          src={product.imageUrl[0]}
          alt={product.name}
        />
      </div>

      {/* Product Details */}
      <div className="text-gray-500/60 text-sm mt-2">
        {categories.find((c) => c._id === product.category)?.name ||
          "Unknown Category"}

        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product.name}
        </p>

        <div className="flex items-end justify-between mt-3">
          {/* Price */}
          <div className="flex flex-col">
            <span className="md:text-xl text-base font-medium text-indigo-500">
              ₹ {product.price}
            </span>
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              ₹ {(product.price * 1.2).toFixed(2)}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#615fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
