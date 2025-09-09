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
        <div className="flex items-center gap-0.5">
          {Array(5)
            .fill("")
            .map((_, i) =>
              product.averageRating > i ? (
                <svg
                  key={i}
                  width="14"
                  height="13"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                    fill="#615fff"
                  />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                    fill="#615fff"
                    fill-opacity="0.35"
                  />
                </svg>
              )
            )}
          <p>({product.numReviews})</p>
        </div>
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
