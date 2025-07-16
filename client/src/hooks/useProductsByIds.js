// src/hooks/useProductsByIds.js
import { useQueries } from "@tanstack/react-query";
import { fetchProduct } from "../api/products"; // Adjust the import path as necessary


export const useProductsByIds = (items) => {
  return useQueries({
    queries: items.map((item) => ({
      queryKey: ["product", item.product],
      queryFn: () => fetchProduct(item.product),
      staleTime: 1000 * 60 * 5,
    })),
  });
};
