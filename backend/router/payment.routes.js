import { Router } from "express";
import {
  createRazorpayOrder,
  verifyPaymentAndCreateOrder,
} from "./../controllers/payment.controller.js";

const payment = Router();

payment.post("/create-order", createRazorpayOrder);
payment.post("/verify", verifyPaymentAndCreateOrder);

export default payment;
