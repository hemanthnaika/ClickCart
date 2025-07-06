import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  order,
} from "../controllers/order.controller.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
import { authorize } from "../middleware/auth.middleware.js";
const orderRouter = Router();

// Public only for user
orderRouter.get("/:id",authorize,order);
orderRouter.post("/create-order/:id",authorize, createOrder);
orderRouter.delete("/delete-order/:id",authorize, deleteOrder);

// Private Routes
orderRouter.get("/", isAdmin,getAllOrders);


export default orderRouter;
