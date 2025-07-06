import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import categoriesReducer from "./features/categories";
import cartReducer from "./features/cartSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
});
