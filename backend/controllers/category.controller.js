import Category from "../models/category.model.js";
import { mongoose } from "mongoose";
import Product from "./../models/product.model.js";

export const categories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const category = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
export const createCategory = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, description, imageUrl } = req.body;
    const exitCategory = await Category.findOne({ name });
    if (exitCategory) {
      const error = new Error("Category already exists");
      error.statusCode = 409;
      throw error;
    }
    const category = await Category.create([{ name, description, imageUrl }], {
      session,
    });
    await session.commitTransaction();
    await session.endSession;

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const { name, description, imageUrl } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Update fields if provided
    category.name = name || category.name;
    category.description = description || category.description;
    category.imageUrl = imageUrl || category.imageUrl;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const category = await Category.findById(req.params.id).session(session);
    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }
    await Product.deleteMany({ category: req.params.id }, { session });
    await Category.deleteOne({ _id: req.params.id }, { session });
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Category and all related products deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const getProductsByCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }
    const products = await Product.find({
      category: category._id,
      stock: { $gt: 0 },
    });

    res.status(200).json({
      success: true,
      message: "In-stock products fetched successfully for this category",
      category: category.name,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
