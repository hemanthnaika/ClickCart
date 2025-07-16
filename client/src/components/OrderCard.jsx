import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { fetchProduct } from "../api/products";
import ImageKit from "./ImgKit";
import Layout from "../Layout";
import { Link } from "react-router";

const OrderCard = ({ id, quantity }) => {
  const category = useSelector((state) => state.categories.categories);
  const { isPending, error, data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });
  return (
    <Layout>
      {data && (
        <Link to={`/products/${data._id}`}>
          <div
            key={data._id}
            className="flex flex-col md:flex-row items-center gap-4 bg-white shadow-md px-4 py-5 rounded-md hover:-translate-y-1.5  ease-in-out "
          >
            <div>
              <ImageKit
                src={data.imageUrl[0]}
                alt={`Product ${data.name}`}
                className="w-20 h-20  hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1">
              {data.name}, {category.find((c) => c._id === data.category)?.name}
            </div>
            <div className=" border px-4 py-2 rounded-md w-full md:w-auto text-center">
              {quantity} x ₹ {data.price}
            </div>
          </div>
        </Link>
      )}
    </Layout>
  );
};

export default OrderCard;
