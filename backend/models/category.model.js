import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is required"],
      unique: true,
      trim: true,
    },
    description: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    imageUrl: String,
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
