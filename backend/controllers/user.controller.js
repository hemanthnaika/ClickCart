import mongoose from "mongoose";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";

export const users = async (req, res, next) => {
 try {
    const users = await User.find().lean(); // Fetch all users

    const userOrderCounts = await Order.aggregate([
      {
        $group: {
          _id: "$user",
          orderCount: { $sum: 1 },
        },
      },
    ]);

    // Map userId to orderCount
    const orderCountMap = {};
    userOrderCounts.forEach((entry) => {
      orderCountMap[entry._id.toString()] = entry.orderCount;
    });

    const result = users.map((user) => ({
      ...user,
      orderCount: orderCountMap[user._id.toString()] || 0,
    }));

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const user = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findById(req.params._id).session(session);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    await user.deleteOne({ session }); // Delete the user using the session

    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  console.log("Update User Request:", req.params._id);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findById(req.user._id).session(session);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Apply updates from req.body
    Object.assign(user, req.body);

    await user.save({ session });

    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};
