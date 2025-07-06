import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Product Name is required"],
      trim: true,
    },
    description: String,
    price: { type: Number, required: [true, "Price is required"] },
    stock: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    imageUrl: [String],
    featured: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
