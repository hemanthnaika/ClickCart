import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/order.model.js";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
export const createRazorpayOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      const error = new Error("Amount is required");
      error.statusCode = 400;
      throw error;
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
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
      deliveryDate,
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

    // Step 1: Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      throw new Error("Invalid payment signature");
    }

    // Step 2: Reduce stock for each product
    for (const item of items) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product: ${product.name}`);
      }

      product.stock -= item.quantity;
      await product.save({ session });
    }

    // Step 3: Create order in DB
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
          deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Payment verified, stock updated, and order created",
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
