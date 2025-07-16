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

  // Helper function to format date
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

  return (
    <Layout>
      <section className="bg-white py-8 antialiased ">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                My orders
              </h2>
            </div>

            <div className="mt-1 flow-root ">
              <div className="divide-y divide-gray-200">
                {/* Order 1 */}
                {orders?.map((order) => (
                  <div className="flex flex-wrap items-center gap-y-4 py-6">
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Order ID:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 pr-10">
                        <a href="#" className="hover:underline">
                          {order._id.slice(0, 8)}...
                        </a>
                      </dd>
                    </dl>
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Date:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 pr-10">
                        {formatDate(order.createdAt)}
                      </dd>
                    </dl>
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Price:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 ">
                        {order.totalPrice}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500">
                        Status:
                      </dt>
                      <dd
                        className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${
                          order.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        <svg
                          className="me-1 h-3 w-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {order.status === "Paid" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          )}
                          {order.status === "Cancelled" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          )}
                          {order.status !== "Paid" &&
                            order.status !== "Cancelled" && (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7h6l2 4m-8-4v8M4 6h7a1 1 0 011 1v1m0 0v8"
                              />
                            )}
                        </svg>
                        {order.status}
                      </dd>
                    </dl>

                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                      <button
                        type="button"
                        className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto"
                      >
                        Cancel order
                      </button>
                      <Link
                        to={`/order/${order._id}`}
                        className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-auto"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Order;
