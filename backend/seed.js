// seed.js
import mongoose from "mongoose";

import { faker } from "@faker-js/faker";
import { DB_URI } from "./config/env.js";
import Category from "./models/category.model.js";
import Product from "./models/product.model.js";

// Connect to MongoDB
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Seed Function
async function seedData() {
  try {
    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();

    // Create categories
    const categories = [];
    for (let i = 0; i < 5; i++) {
      const category = new Category({
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
      });
      await category.save();
      categories.push(category);
    }

    // Create products
    for (let i = 0; i < 20; i++) {
      const product = new Product({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 1, max: 100 }),
        category: faker.helpers.arrayElement(categories)._id,
        imageUrl: faker.image.urlPicsumPhotos(),
      });
      await product.save();
    }

    console.log("🌱 Dummy data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedData();
