import { Router } from "express";
import {
  addReview,
  createProduct,
  deleteProduct,
  getMyReview,
  product,
  products,
  searchProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
import { authorize } from "../middleware/auth.middleware.js";
const productRouter = Router();

// Public Routes
productRouter.get("/", products);
productRouter.get("/search", searchProducts);
productRouter.get("/:id", product);
productRouter.post("/product-review", authorize, addReview);
productRouter.get("/:id/my-review", authorize, getMyReview);

// Private Routes
productRouter.post("/create-product", isAdmin, createProduct);
productRouter.put("/update-product/:id", isAdmin, updateProduct);
productRouter.delete("/delete-product/:id", isAdmin, deleteProduct);

export default productRouter;
