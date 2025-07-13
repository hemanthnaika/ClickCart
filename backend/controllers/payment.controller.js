import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/order.model.js"; // path to your order model
import mongoose from "mongoose";
import User from "./../models/user.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res, next) => {
  try {
    const {
      userId,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
      amount, // for Razorpay
    } = req.body;

    // Debug log (remove in production)
    console.log("Received order payload:", req.body);

    if (
      !userId ||
      !items ||
      !shippingAddress ||
      !paymentMethod ||
      !totalPrice
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create MongoDB Order
    const order = await Order.create({
      user: userId,
      items,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    // Create Razorpay Order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects paisa
      currency: "INR",
      receipt: order._id.toString(),
      payment_capture: 1,
    });

    return res.status(201).json({
      success: true,
      razorpayOrder,
      orderId: order._id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create order failed:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const verify = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    await Order.findByIdAndUpdate(orderId, {
      status: "Paid",
    });

    res.status(200).json({
      success: true,
      message: "Payment verified and order updated",
    });
  } catch (error) {
    next(error);
  }
};
