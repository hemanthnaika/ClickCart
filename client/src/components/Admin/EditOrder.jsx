import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import ImageKit from "../ImgKit";
import toast from "react-hot-toast";

const statusOptions = [
  "Order Placed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

// Fetch order by ID
const fetchOrder = async (orderId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/orders/${orderId}`,
    { withCredentials: true }
  );
  return data.data;
};

// Fetch individual product by ID
const fetchProduct = async (productId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/products/${productId}`
  );
  return data.data;
};

// Update order status
const updateOrderStatus = async ({ orderId, status }) => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/v1/orders/${orderId}/status`,
    { status },
    { withCredentials: true }
  );
  return data.data;
};

const EditOrder = () => {
  const { id: orderId } = useParams();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [productInfoMap, setProductInfoMap] = useState({});

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId),
  });

  const mutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["order", orderId]);
      toast.success("Order status updated successfully");
      setSelectedStatus("");
    },
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (!order?.items) return;

      const productIds = order.items.map((item) => item.product);
      const fetches = productIds.map((id) => fetchProduct(id));

      try {
        const results = await Promise.all(fetches);
        const map = {};
        results.forEach((product) => {
          map[product._id] = product;
        });
        setProductInfoMap(map);
      } catch (err) {
        toast.error("Failed to fetch product details");
      }
    };

    fetchAllProducts();
  }, [order]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedStatus) return;
    mutation.mutate({ orderId, status: selectedStatus });
  };

  if (isLoading) return <p>Loading order...</p>;
  if (isError) return <p className="text-red-500">Failed to load order.</p>;

  const isCancelled = order.status === "Cancelled";

  const filteredStatusOptions = statusOptions.filter(
    (status) => status !== order.status
  );

  // Format function
  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Edit Order</h2>

      {/* Order Info */}
      <div className="mb-6 space-y-1">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>User ID:</strong> {order.user}
        </p>
        <p>
          <strong>Current Status:</strong>{" "}
          <span
            className={`font-semibold ${isCancelled ? "text-red-600" : ""}`}
          >
            {order.status}
          </span>
        </p>
        <p>
          <strong>Total Price:</strong> ₹ {order.totalPrice}
        </p>
        <p>
          <strong>Order Date:</strong> {formatDateTime(order.createdAt)}
        </p>
        {order.status === "Delivered" && order.deliveredAt && (
          <p>
            <strong>Delivered Date:</strong> {formatDateTime(order.deliveredAt)}
          </p>
        )}
      </div>

      {/* Shipping Address */}
      {order.shippingAddress && (
        <div className="mb-6">
          <h3 className="font-semibold mb-1">Shipping Address:</h3>
          <p>{order.shippingAddress}</p>
        </div>
      )}

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Items:</h3>
        <ul className="space-y-3">
          {order.items?.map((item) => {
            const product = productInfoMap[item.product];
            return (
              <li
                key={item._id}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{product?.name || "Loading..."}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{product?.price || "N/A"}</p>
                </div>
                {product?.imageUrl && (
                  <ImageKit
                    src={product.imageUrl[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Status Update */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Update Status:</label>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="border rounded px-3 py-2 w-full"
          disabled={isCancelled}
        >
          <option value="">Select status</option>
          {filteredStatusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isCancelled || mutation.isLoading || !selectedStatus}
        className={`${
          isCancelled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white px-5 py-2 rounded disabled:opacity-50`}
      >
        {mutation.isLoading ? "Updating..." : "Update Status"}
      </button>

      {isCancelled && (
        <p className="text-red-500 mt-4 font-medium">
          This order is cancelled and cannot be edited.
        </p>
      )}
    </div>
  );
};

export default EditOrder;
