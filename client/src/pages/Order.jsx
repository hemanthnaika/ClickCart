import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { fetchOrder } from "../api/order";
import Layout from "../Layout";
import OrderCard from "../components/orderCard";
import { CheckCircle, Circle } from "lucide-react";
import Invoice from "../components/Invoice";
import ReviewForm from "./../components/ReviewForm";

const Order = () => {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrder(id),
  });

  const formatDate = (isoString) =>
    new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const isCancelled = data?.status === "Cancelled";

  const steps = isCancelled
    ? ["Order Placed", "Cancelled"]
    : ["Order Placed", "Shipped", "Out for Delivery", "Delivered"];

  const currentIndex = isCancelled
    ? 1
    : steps.indexOf(data?.status || "Order Placed");

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
        {isPending && <p className="text-center">Loading...</p>}
        {error && (
          <p className="text-center text-red-500">Error: {error.message}</p>
        )}

        {data && (
          <>
            <h1 className="text-2xl font-bold mb-1">Order ID: {data._id}</h1>
            <p className="text-sm text-gray-500 mb-6">
              Placed on: {formatDate(data.createdAt)}
            </p>

            <div className="mb-10">
              <div className="relative flex justify-between items-center">
                {steps.map((step, index) => {
                  const isComplete = index <= currentIndex;
                  const isCancelledStep = step === "Cancelled";

                  return (
                    <div
                      key={step}
                      className="flex-1 flex flex-col items-center z-10"
                    >
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-white text-xs font-bold ${
                          isComplete
                            ? isCancelledStep
                              ? "bg-red-600 border-red-600"
                              : "bg-blue-600 border-blue-600"
                            : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        {isComplete ? (
                          <CheckCircle size={20} />
                        ) : (
                          <Circle size={20} />
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs font-semibold text-center ${
                          isComplete
                            ? isCancelledStep
                              ? "text-red-700"
                              : "text-blue-700"
                            : "text-gray-400"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}

                <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 z-0 rounded" />
                <div
                  className={`absolute top-4 left-4 h-1 z-0 rounded transition-all duration-500 ${
                    isCancelled ? "bg-red-500" : "bg-blue-500"
                  }`}
                  style={{
                    width: `${(currentIndex / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Order Items</h2>
              <div className=" grid md:grid-cols-2 gap-4">
                {data.items.map((item) => (
                  <div key={item._id} className="border px-5 py-2 rounded-md">
                    <OrderCard id={item.product} quantity={item.quantity} />
                    {data.status === "Delivered" && (
                      <ReviewForm productId={item.product} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6 space-y-2">
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              <p>
                <strong>Total:</strong> ₹ {data.totalPrice}
              </p>
              <p>
                <strong>Shipping Address:</strong> {data.shippingAddress}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    data.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : data.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {data.status}
                </span>
              </p>
              <p>
                <strong>Payment Method:</strong> {data.paymentMethod}
              </p>
              <p>
                <strong>Delivery Date:</strong>{" "}
                {data.deliveryDate ? formatDate(data.deliveryDate) : "Pending"}
              </p>

              {data.status === "Delivered" && <Invoice order={data} />}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Order;
