import Order from "./../models/order.model.js";
export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name price") // include product name/price
      .sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      const error = new Error("No orders found for this user");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// export const createOrder = async (req, res, next) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const user = await User.findById(req.params.id)
//       .select("_id")
//       .session(session);
//     if (!user) {
//       const error = new Error("User not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     const {
//       orderItems,
//       shippingAddress,
//       paymentMethod,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//     } = req.body;

//     // Optional: Validate that orderItems is a non-empty array
//     if (!orderItems || orderItems.length === 0) {
//       const error = new Error("No order items");
//       error.statusCode = 400;
//       throw error;
//     }

//     // Create order
//     const [order] = await Order.create(
//       [
//         {
//           user: user._id, // associate with user
//           orderItems,
//           shippingAddress,
//           paymentMethod,
//           itemsPrice,
//           taxPrice,
//           shippingPrice,
//           totalPrice,
//         },
//       ],
//       { session }
//     );

//     await session.commitTransaction();
//     session.endSession();

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       data: order,
//     });
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     next(error);
//   }
// };

export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    // Optional: prevent cancelling delivered or already cancelled orders
    if (order.status === "Delivered" || order.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled. Current status: ${order.status}`,
      });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
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

///Admin Routes
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      const error = new Error("No orders found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// UPDATE order status
export const updateOrderStatus = async (req, res, next) => {
  const { status } = req.body;
  const validStatuses = [
    "Order Placed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();
    res.json({ message: "Order status updated", order });
  } catch (err) {
    next(err);
  }
};
