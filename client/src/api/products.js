import axios from "axios";

export const fetchProducts = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/products`
  );
  return response.data.data;
};

export const fetchProduct = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/products/${id}`
  );
  return response.data.data;
};

export const addProduct = async (productData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/products/create-product`,
    productData,
    {
      withCredentials: true,
    }
  );
  return response.data.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/v1/products/delete-product/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const updateProduct = async ({ id, data }) => {
  const res = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/v1/products/update-product/${id}`,
    data,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
