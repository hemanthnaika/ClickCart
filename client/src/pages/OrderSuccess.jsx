import { CheckCircle } from "lucide-react"; // Optional: use any success icon
import { Link } from "react-router";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
