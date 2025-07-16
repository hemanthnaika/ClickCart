import axios from "axios";

export const fetchOrders = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/orders/user`,
    {
      withCredentials: true, // 👈 This sends the cookie!
    }
  );
  return data.orders;
};

export const fetchOrder = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/orders/user/${id}`,
    {
      withCredentials: true, // 👈 This sends the cookie!
    }
  );
  return data.data;
};

export const cancelOrder = async (id) => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/v1/orders/cancel/${id}`,
    {},
    {
      withCredentials: true,
    }
  );
  return data;
};
