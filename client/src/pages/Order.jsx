import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Order = () => {
  const user = useSelector((state) => state.auth.user?.user);
  const items = useSelector((state) => state.cart.items);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = totalPrice * 0.02;
  const grandTotal = totalPrice + tax;

  const handlePlaceOrder = () => {
    const orderData = {
      customerName: name,

      items: items,
      total: grandTotal.toFixed(2),
    };

    console.log("Order Placed:", orderData);
    alert("Order placed successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
      {/* Left: Items and address */}
      <div>
        <h1 className="text-3xl font-bold mb-6">Review Your Order</h1>

        {/* Address Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Address</h2>
          <p>{user?.address || "No address provided"}</p>
          <Link to="/profile">
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
              Change Address
            </button>
          </Link>
        </div>

        {/* Ordered Items */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Your Items</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">No items in your cart.</p>
          ) : (
            <table className="w-full text-left text-sm border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">{item.quantity}</td>
                    <td className="p-2 border">
                      ₹ {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Right: Summary */}
      <div className="bg-gray-100 p-5 rounded shadow h-fit">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="text-gray-600 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Order;
