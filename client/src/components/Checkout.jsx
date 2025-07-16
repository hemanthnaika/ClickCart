import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { clearCart } from "../features/cartSlice";

const CheckoutButton = ({
  amount,
  items,
  shippingAddress,
  paymentMethod,
  totalPrice,
  userId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user?.user);
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/payment/create-order`,
        { amount }
      );

      const { razorpayOrder, key } = data;

      const options = {
        key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "ClickCart",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          const verificationRes = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/v1/payment/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId,
              items,
              shippingAddress,
              paymentMethod,
              totalPrice,
            }
          );

          if (verificationRes.data.success) {
            toast.success("Payment successful!");
            dispatch(clearCart());
            navigate("/order-success");
          } else {
            toast.error(`Payment failed: ${verificationRes}`);
          }
        },
        prefill: {
          name: user?.name || "Customer Name",
          email: user?.email || "customer@example.com",
          contact: user?.phoneNumber || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-5 cursor-pointer"
    >
      {loading ? "Processing..." : `Pay ₹${totalPrice}`}
    </button>
  );
};

export default CheckoutButton;
