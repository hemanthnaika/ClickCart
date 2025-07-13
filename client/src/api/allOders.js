import axios from "axios";

export const fetchAllOrders = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/orders`,
    {
      withCredentials: true, // 👈 This sends the cookie!
    }
  );
  return data.orders;
};
