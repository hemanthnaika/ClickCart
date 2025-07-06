import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      minLength: 6,
    },
    isAdmin: { type: Boolean, default: false },
    address: { type: String },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, "Please enter a valid phone number"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
