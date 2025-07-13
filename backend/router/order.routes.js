import { Router } from "express";
import {
  deleteOrder,
  getAllOrders,
  getUserOrders,
  order,
} from "../controllers/order.controller.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
import { authorize } from "../middleware/auth.middleware.js";
const orderRouter = Router();

// Public only for user
orderRouter.get("/user", authorize, getUserOrders);
orderRouter.delete("/delete-order/:id", authorize, deleteOrder);

// Private Routes
orderRouter.get("/", isAdmin, getAllOrders);

export default orderRouter;
