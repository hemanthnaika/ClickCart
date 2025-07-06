import axios from "axios";

export const login = async ({ email, password }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/sign-in`,
    { email, password, name },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const signUp = async ({ name, email, password }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/sign-up`,
    { email, password, name },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const getMe = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/me`,
    { withCredentials: true }
  );
  return response.data;
};

export const signOut = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/sign-out`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
