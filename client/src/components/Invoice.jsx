import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useProductsByIds } from "../hooks/useProductsByIds";

const Invoice = ({ order }) => {
  const invoiceRef = useRef();

  const productQueries = useProductsByIds(order.items);
  const isLoading = productQueries.some((q) => q.isLoading);
  const isError = productQueries.some((q) => q.isError);
  const products = productQueries.map((q) => q.data);

  const handleDownload = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 0.5,
      filename: `invoice-${order._id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  if (isLoading) return <p>Loading invoice...</p>;
  if (isError)
    return <p className="text-red-500">Failed to load product details.</p>;

  return (
    <div className="mt-10">
      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download Invoice
      </button>

      <div
        ref={invoiceRef}
        className="p-6 mt-4 bg-white border rounded shadow text-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Invoice</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Billed To:</h3>
            <p>{order.shippingAddress}</p>
            <p>{order.customerName || "Customer"}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Sold By:</h3>
            <p>ClickCart</p>
            <p>Email: clickCart@example.com</p>
            <p>Phone: +91-9876543210</p>
          </div>
        </div>

        <div className="mb-6">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
        </div>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">Items</h3>
        <div className="grid grid-cols-4 font-semibold border-b py-1">
          <div>Product</div>
          <div className="text-right">Price</div>
          <div className="text-right">Qty</div>
          <div className="text-right">Total</div>
        </div>

        {order.items.map((item, index) => {
          const product = products[index];
          const name = product?.name || "Product";
          const price = product?.price ?? 0;
          const quantity = item.quantity;
          const subtotal = price * quantity;

          return (
            <div
              key={index}
              className="grid grid-cols-4 border-b py-1 items-center"
            >
              <div>{name}</div>
              <div className="text-right">₹{price.toFixed(2)}</div>
              <div className="text-right">{quantity}</div>
              <div className="text-right">₹{subtotal.toFixed(2)}</div>
            </div>
          );
        })}

        <div className="text-right mt-4 text-lg font-semibold">
          Grand Total: ₹{order.totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
