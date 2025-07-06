import { Router } from "express";
import { total } from "./../controllers/total.Controller.js";
import { authorize } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
const totalRouter = Router();

totalRouter.get("/", authorize, isAdmin, total);

export default totalRouter;
