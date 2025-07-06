import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../features/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setUser(query.data));
    }
  }, [query.data, dispatch]);
  return {
    refetch: query.refetch,
    isLoading: query.isLoading,
    isError: query.isError,
    data: query.data,
  };
};
