import { Router } from "express";
import {
  categories,
  category,
  createCategory,
  deleteCategory,
  getProductsByCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
const categoriesRouter = Router();

// Public Routes
categoriesRouter.get("/", categories);
categoriesRouter.get("/:id", category);
categoriesRouter.get("/get-products/:id", getProductsByCategory);

// Private Routes
categoriesRouter.post("/create-category", isAdmin, createCategory);
categoriesRouter.put("/update-category/:id", isAdmin, updateCategory);
categoriesRouter.delete("/delete-category/:id", isAdmin, deleteCategory);

export default categoriesRouter;
