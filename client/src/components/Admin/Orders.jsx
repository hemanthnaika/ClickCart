import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchOrders } from "../../api/order";
import { fetchAllOrders } from "../../api/allOders";
import { Link } from "react-router";

const Orders = () => {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchAllOrders,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";
  console.log(orders);
  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>
      {orders.map((order, index) => (
        <Link
          to={`/admin/order/${order._id}`}
          key={index}
          className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-7xl rounded-md border border-gray-300 text-gray-800"
        >
          <div className="flex gap-5">
            <img
              className="w-12 h-12 object-cover opacity-60"
              src={boxIcon}
              alt="boxIcon"
            />
          </div>

          <div className="text-sm">
            <p className="font-medium mb-1">
              {order.user.name} ({order.user.email})
            </p>
            <p>Address: {order.shippingAddress}</p>
          </div>

          <p className="font-medium text-base my-auto text-black/70">
            ₹.{order.totalPrice}
          </p>

          <div className="flex flex-col text-sm">
            <p>Method: {order.paymentMethod}</p>
            <p>
              Date:{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-500">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${
                  order.status === "Paid"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status}
              </span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Orders;
