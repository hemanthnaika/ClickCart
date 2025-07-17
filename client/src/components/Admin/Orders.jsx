import React from "react";
import { useQuery } from "@tanstack/react-query";
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

  // Function to return color classes based on status
  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Paid":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-indigo-100 text-indigo-800";
      case "Out for Delivery":
        return "bg-amber-100 text-amber-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading orders...</p>;
  if (isError)
    return <p className="text-center text-red-600 py-10">{error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">All Orders</h2>

      {orders?.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <Link
              to={`/admin/edit-order/${order._id}`}
              key={order._id}
              className="block border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all p-5 bg-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-center">
                {/* Icon and user info */}
                <div className="flex items-center gap-4">
                  <img
                    src={boxIcon}
                    alt="Order Icon"
                    className="w-12 h-12 object-contain opacity-60"
                  />
                  <div className="text-sm md:text-base">
                    <p className="font-semibold text-gray-800">
                      {order.user.name}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm">
                      {order.user.email}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {order.shippingAddress}
                  </p>
                </div>

                {/* Payment info */}
                <div className="flex flex-col text-sm md:text-base text-gray-700">
                  <p className="font-semibold text-black">
                    ₹{order.totalPrice.toFixed(2)}
                  </p>
                  <p>Method: {order.paymentMethod}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
