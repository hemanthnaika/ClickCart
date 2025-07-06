import { Router } from "express";
import {
  deleteUser,
  updateUser,
  user,
  users,
} from "../controllers/user.controller.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
import { authorize } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", isAdmin, users);
userRouter.get("/:id", authorize, user);
userRouter.put("/update/:id", authorize, updateUser);
userRouter.delete("/delete/:id", isAdmin, deleteUser);

export default userRouter;
