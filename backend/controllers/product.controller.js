import mongoose from "mongoose";
import Product from "./../models/product.model.js";
import Category from "../models/category.model.js";

// GET all products
export const products = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// GET single product by ID
export const product = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE a product
export const createProduct = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
      popular = false,
      featured = false,
    } = req.body;

    const existProduct = await Product.findOne({ name }).session(session);
    if (existProduct) {
      throw new Error("Product already exists");
    }

    const existingCategory = await Category.findById(category).session(session);
    if (!existingCategory) {
      const error = new Error("Category does not exist");
      error.statusCode = 400;
      throw error;
    }

    const [product] = await Product.create(
      [
        {
          name,
          description,
          price,
          stock,
          category,
          imageUrl,
          popular,
          featured,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// UPDATE a product
export const updateProduct = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
      popular = false,
      featured = false,
    } = req.body;

    const product = await Product.findById(req.params.id).session(session);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    const existingCategory = await Category.findById(category).session(session);
    if (!existingCategory) {
      const error = new Error("Category does not exist");
      error.statusCode = 400;
      throw error;
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.category = category;
    product.imageUrl = imageUrl;
    product.popular = popular;
    product.featured = featured;

    await product.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// DELETE a product
export const deleteProduct = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const product = await Product.findById(req.params.id).session(session);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    await product.deleteOne({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// SEARCH products
export const searchProducts = async (req, res, next) => {
  try {
    const query = req.query.q;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }

    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    });

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
