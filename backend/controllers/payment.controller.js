import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/order.model.js"; // path to your order model
import mongoose from "mongoose";
import User from "./../models/user.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      const error = new Error("Amount is required");
      error.statusCode = 400;
      throw error;
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      payment_capture: 1,
    });

    return res.status(201).json({
      success: true,
      razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPaymentAndCreateOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !userId ||
      !items ||
      !shippingAddress ||
      !paymentMethod ||
      !totalPrice
    ) {
      throw new Error("Missing required fields");
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      throw new Error("Invalid payment signature");
    }

    const [order] = await Order.create(
      [
        {
          user: userId,
          items,
          totalPrice,
          shippingAddress,
          paymentMethod,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Payment verified and order created",
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
