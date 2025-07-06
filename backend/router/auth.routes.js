import { Router } from "express";
import {
  getCurrentUser,
  signIn,
  signOut,
  signUp,
  uploadAuth,
} from "../controllers/auth.controller.js";
import { authorize } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.get("/sign-out", signOut);
authRouter.get("/me", authorize, getCurrentUser);
authRouter.get("/upload-auth", isAdmin, uploadAuth);
export default authRouter;
