import axios from "axios";

export const fetchCategory = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/categories/${id}`
  );
  return response.data.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/categories`
  );
  return response.data.data;
};

export const updateCategory = async ({ id, data }) => {
  const res = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/v1/categories/update-category/${id}`,
    data,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const fetchProductsByCategory = async (categoryId) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/api/v1/categories/get-products/${categoryId}`
  );
  return res.data.data; // this returns the actual product array
};
