import React from "react";
import { useNavigate, useParams } from "react-router"; // corrected import
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";
import Cards from "../components/Cards";
import { fetchProduct } from "../api/products";
import { fetchProductsByCategory } from "../api/category";
import ImageKit from "../components/ImgKit";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { addToCart } from "../features/cartSlice";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxCategories = useSelector((state) => state.categories.categories);

  const {
    isPending,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  const {
    data: relatedProducts,
    isPending: isRelatedLoading,
    error: relatedError,
  } = useQuery({
    queryKey: ["productsByCategory", product?.category],
    queryFn: () => fetchProductsByCategory(product.category),
    enabled: !!product?.category,
  });

  const [thumbnail, setThumbnail] = React.useState(null);

  React.useEffect(() => {
    if (product?.imageUrl?.length > 0) {
      setThumbnail(product.imageUrl[0]);
    }
  }, [product]);

  if (isPending || !product) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  const categoryName =
    reduxCategories.find((c) => c._id === product.category)?.name || "Unknown";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    toast.success(`"${product.name}" added to cart!`);
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <Layout>
      <div className="max-w- w-full px-6">
        {/* Breadcrumbs */}
        <p className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
          <span>Home</span> / <span>Products</span> /{" "}
          <span>{categoryName}</span> /{" "}
          <span className="text-indigo-500 truncate inline-block max-w-[200px] align-middle">
            {product.name}
          </span>
        </p>

        {/* Product View */}
        <div className="flex flex-col md:flex-row gap-16 mt-4">
          {/* Image Gallery */}
          <div className="flex gap-3 md:flex-row flex-col-reverse">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3">
              {product.imageUrl?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`relative w-20 h-20 border border-gray-500/30 rounded overflow-hidden cursor-pointer ${
                    thumbnail === image ? "ring-2 ring-indigo-500" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
                  />
                  <ImageKit
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="relative z-10 w-full h-full object-contain p-1"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative border border-gray-500/30 w-full md:w-[500px] h-96 rounded-2xl overflow-hidden py-5">
              {thumbnail && (
                <>
                  <img
                    src={thumbnail}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
                  />
                  <ImageKit
                    src={thumbnail}
                    alt="Selected product"
                    className="relative z-10 w-full h-full object-contain p-2 "
                  />
                </>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-4xl font-medium">{product.name}</h1>
            <div className="flex items-center gap-0.5 mt-1">
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
                      key={i}
                      width="14"
                      height="13"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                        fill="#615fff"
                        fillOpacity="0.35"
                      />
                    </svg>
                  )
                )}
              <p className="text-base ml-2">({product.numReviews})</p>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <p className="text-gray-500/70 line-through ">
                MRP: ₹ {(product.price * 1.2).toFixed(2)}
              </p>
              <p className="text-2xl font-medium text-gray-800">
                MRP: ₹ {product.price}
              </p>
              <span className="text-gray-500/70 ">
                (inclusive of all taxes)
              </span>
            </div>

            <p className="text-xl font-bold mt-5">About Product</p>
            <p className="text-lg text-gray-500/70 text-justify tracking-wide mt-5">
              {Array.isArray(product.description)
                ? product.description.map((desc, i) => <p key={i}>{desc}</p>)
                : product.description && <p>{product.description}</p>}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                className="w-full py-3.5 font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition cursor-pointer"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="w-full py-3.5 font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition cursor-pointer"
                onClick={handleAddToCart}
              >
                Buy Now
              </button>
            </div>
            {/* ------------------ Reviews Section ------------------ */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
              {product.reviews?.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {product.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border border-gray-300 rounded-lg p-4"
                    >
                      <p className="font-semibold text-lg">
                        {review.user.name}
                      </p>
                      <div className="flex items-center gap-1 text-yellow-500 mt-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className="text-2xl">
                            {i < review.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      {review.comment && (
                        <p className="text-gray-700 mt-1 text-md">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <h1 className="text-2xl font-bold py-5">Similar Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-x-2 gap-y-6">
          {isRelatedLoading ? (
            <p className="text-gray-500">Loading similar products...</p>
          ) : relatedProducts?.length ? (
            relatedProducts
              .filter((p) => p._id !== product._id) // exclude current product
              .slice(0, 10)
              .map((item) => <Cards key={item._id} product={item} />)
          ) : (
            <p className="text-gray-500">No similar products found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
