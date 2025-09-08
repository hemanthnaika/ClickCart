import React from "react";
import Layout from "../Layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router"; // corrected
import { cancelOrder, fetchOrders } from "./../api/order";
import toast from "react-hot-toast";

const MyOrder = () => {
  const queryClient = useQueryClient();

  // Fetch Orders
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

  // Cancel Order Mutation
  const { mutate: cancelOrderMutate, isPending: isCancelling } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success("Order cancelled successfully");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to cancel order");
    },
  });

  const handleCancel = (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmCancel) {
      cancelOrderMutate(orderId);
    }
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ✅ Dynamic status color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Order Placed":
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

  return (
    <Layout>
      <section className="bg-white py-8 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                My Orders
              </h2>
            </div>

            <div className="mt-1 flow-root">
              <div className="divide-y divide-gray-200">
                {orders?.map((order) => (
                  <div
                    key={order._id}
                    className="flex flex-wrap items-center gap-y-4 py-6"
                  >
                    {/* Order ID */}
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Order ID:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 pr-10">
                        {order._id.slice(0, 8)}...
                      </dd>
                    </dl>

                    {/* Order Date */}
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Date:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 pr-10">
                        {formatDate(order.createdAt)}
                      </dd>
                    </dl>

                    {/* Delivery Date */}
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Delivery Date:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 pr-10">
                        {order.deliveryDate
                          ? formatDate(order.deliveryDate)
                          : "Not Assigned"}
                      </dd>
                    </dl>

                    {/* Price */}
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Price:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900">
                        ₹ {order.totalPrice}
                      </dd>
                    </dl>

                    {/* Status */}
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Status:
                      </dt>
                      <dd
                        className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </dd>
                    </dl>

                    {/* Actions */}
                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                      {/* Cancel */}
                      {order.status !== "Cancelled" &&
                        order.status !== "Delivered" && (
                          <button
                            onClick={() => handleCancel(order._id)}
                            disabled={isCancelling}
                            className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto"
                          >
                            {isCancelling ? "Cancelling..." : "Cancel Order"}
                          </button>
                        )}

                      {/* View */}
                      <Link
                        to={`/order/${order._id}`}
                        className="w-full inline-flex justify-center rounded-lg border border-black px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-auto"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}

                {!orders?.length && (
                  <div className="text-center py-10 text-gray-600">
                    You have no orders yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyOrder;
