import React from "react";
import Layout from "../Layout";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/order";
import { Link } from "react-router";

const Order = () => {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const statusColors = {
    Paid: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  console.log(orders);
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>

        {isLoading && (
          <p className="text-gray-600 dark:text-gray-300">
            Loading your orders...
          </p>
        )}
        {isError && (
          <p className="text-red-600 dark:text-red-400 font-medium">
            Error: {error.message}
          </p>
        )}
        {!isLoading && orders?.length === 0 && (
          <p className="text-gray-400 dark:text-gray-500">
            You haven't placed any orders yet.
          </p>
        )}

        {orders?.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">
                      <Link to={`order/{order._id}`}>{order._id}</Link>
                    </td>
                    <td className="py-3 px-4">
                      {" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4">{order.totalPrice}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Order;
