import User from "./../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const isAdmin = async (req, res, next) => {
  try {
    // ✅ 1. Read token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // ✅ 2. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded User ID:", decoded.userId);

    // ✅ 3. Find user by ID
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // ✅ 4. Check if user is an admin
    console.log("Is Admin:", user.isAdmin);
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    // ✅ 5. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
