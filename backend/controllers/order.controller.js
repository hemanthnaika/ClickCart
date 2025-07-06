import mongoose from "mongoose";
import Order from "./../models/order.model.js";
import User from "../models/user.model.js";
export const getAllOrders = async (req, res, next) => {
  try {
    const getOrders = await Order.find();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: getOrders,
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(req.params.id)
      .select("_id")
      .session(session);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // Optional: Validate that orderItems is a non-empty array
    if (!orderItems || orderItems.length === 0) {
      const error = new Error("No order items");
      error.statusCode = 400;
      throw error;
    }

    // Create order
    const [order] = await Order.create(
      [
        {
          user: user._id, // associate with user
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const deleteOrder =async (req, res,next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const order = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};