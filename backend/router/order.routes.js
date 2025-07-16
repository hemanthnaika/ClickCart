import { Router } from "express";
import {
  cancelOrder,
  getAllOrders,
  getOrder,
  getUserOrders,
} from "../controllers/order.controller.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
import { authorize } from "../middleware/auth.middleware.js";
const orderRouter = Router();

// Public only for user
orderRouter.get("/user", authorize, getUserOrders);
orderRouter.get("/user/:id", authorize, getOrder);
orderRouter.patch("/cancel/:id", authorize, cancelOrder);

// Private Routes
orderRouter.get("/", isAdmin, getAllOrders);

export default orderRouter;
