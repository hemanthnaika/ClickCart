import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";

export const total = async (req, res, next) => {
  try {
    const [users, products, orders, categories] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Category.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        users,
        products,
        orders,
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};
