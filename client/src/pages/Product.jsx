import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Layout from "../Layout";

import Cards from "../components/Cards"; // adjust this import path if needed
import { fetchProduct } from "../api/products";
import ImageKit from "../components/ImgKit";

const Product = () => {
  const { id } = useParams();
  const category = useSelector((state) => state.categories.categories);
  const { isPending, error, data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  const [thumbnail, setThumbnail] = React.useState(null);

  React.useEffect(() => {
    if (data?.imageUrl?.length > 0) {
      setThumbnail(data.imageUrl[0]);
    }
  }, [data]);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Product not found</p>;

  const categoryName = category.find((c) => c._id === data.category)?.name;
  console.log(data);
  return (
    <Layout>
      <div className="max-w-6xl w-full px-6">
        <p className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
          <span>Home</span> / <span>Products</span> /{" "}
          <span>{categoryName || "Unknown"}</span> /{" "}
          <span className="text-indigo-500 truncate inline-block max-w-[200px] align-middle">
            {data.name}
          </span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          {/* Thumbnails + Main Image */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {data.imageUrl?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <ImageKit
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20  hover:scale-105 transition-transform"
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
            <h1 className="text-lg font-medium">{data.name}</h1>

            {/* Pricing */}
            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: ₹ {(data.price * 1.2).toFixed(2)}
              </p>
              <p className="text-2xl font-medium text-gray-800">
                MRP: ₹ {data.price}
              </p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            {/* Description */}
            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {Array.isArray(data.description)
                ? data.description.map((desc, i) => <li key={i}>{desc}</li>)
                : data.description && <li>{data.description}</li>}
            </ul>

            {/* Buttons */}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-x-1 gap-y-5">
          {/* You can map actual similar products here in future */}
          {Array(8)
            .fill("")
            .map((_, index) => (
              <Cards key={index} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
