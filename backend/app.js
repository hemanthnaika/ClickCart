import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./router/auth.routes.js";
import productRouter from "./router/product.routes.js";
import userRouter from "./router/user.routes.js";
import orderRouter from "./router/order.routes.js";
import categoriesRouter from "./router/category.routes.js";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import totalRouter from "./router/total.routes.js";
import payment from "./router/payment.routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://click-cart-shop.vercel.app/"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/total", totalRouter);
app.use("/api/v1/payment", payment);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("E-commerce Backend API");
});
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});
export default app;
