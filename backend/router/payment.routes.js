import { Router } from "express";
import { createOrder, verify } from "../controllers/payment.controller.js";

const payment = Router();

payment.post("/create-order", createOrder);
payment.post("/verify", verify);

export default payment;
