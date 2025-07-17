import React from "react";
import { useParams } from "react-router"; // corrected import
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Layout from "../Layout";
import Cards from "../components/Cards";
import { fetchProduct } from "../api/products";
import { fetchProductsByCategory } from "../api/category";
import ImageKit from "../components/ImgKit";
import Spinner from "../components/Spinner";

const Product = () => {
  const { id } = useParams();
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
  console.log(relatedProducts);
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

  return (
    <Layout>
      <div className="max-w-6xl w-full px-6">
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
            <div className="flex md:flex-col gap-3">
              {product.imageUrl?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <ImageKit
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
            <div className="border border-gray-500/30 w-full max-w-md rounded overflow-hidden">
              {thumbnail && (
                <ImageKit
                  src={thumbnail}
                  alt="Selected product"
                  className="w-full h-96 object-cover"
                />
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-lg font-medium">{product.name}</h1>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: ₹ {(product.price * 1.2).toFixed(2)}
              </p>
              <p className="text-2xl font-medium text-gray-800">
                MRP: ₹ {product.price}
              </p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {Array.isArray(product.description)
                ? product.description.map((desc, i) => <li key={i}>{desc}</li>)
                : product.description && <li>{product.description}</li>}
            </ul>

            {/* Action Buttons */}
            <div className="flex items-center mt-10 gap-4 text-base">
              <button className="w-full py-3.5 font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                Add to Cart
              </button>
              <button className="w-full py-3.5 font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <h1 className="text-2xl font-bold py-5">Similar Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-6">
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
