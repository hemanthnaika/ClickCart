import axios from "axios";

export const addCategory = async ({ name, description, imageUrl }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/categories/create-category`,
    { name, description, imageUrl },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/v1/categories/delete-category/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const updateCategory = async (id, { name, description, imageUrl }) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/v1/categories/update-category/${id}`,
    { name, description, imageUrl },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
