import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../api/category";
import { setCategories } from "../features/categories";

export const useCategory = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategories,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setCategories(query.data));
    }
  }, [query.data, dispatch]);

  return {
    refetch: query.refetch,
    isLoading: query.isLoading,
    isError: query.isError,
    data: query.data,
  };
};
