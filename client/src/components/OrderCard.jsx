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
    <>
      {data && (
        <Link to={`/products/${data._id}`}>
          <div
            key={data._id}
            className="grid grid-cols-2 gap-4   pt-5 border-b pb-2"
          >
            <div>
              <ImageKit
                src={data.imageUrl[0]}
                alt={`Product ${data.name}`}
                className="w-28 h-28  hover:scale-105 transition-transform"
              />
            </div>
            <div className="">
              <p className=" font-bold ">
                {" "}
                {data.name},{" "}
                {category.find((c) => c._id === data.category)?.name}
              </p>
              <p className="font-semibold text-gray-600 mt-2 border px-5 py-2 rounded-md">
                {" "}
                {quantity} x ₹ {data.price}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default OrderCard;
