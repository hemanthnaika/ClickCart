import axios from "axios";

export const fetchTotal = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/total`,
    {
      withCredentials: true,
    }
  );
  return response.data.data;
};
