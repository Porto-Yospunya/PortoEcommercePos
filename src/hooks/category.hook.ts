import useSWR from "swr";
import { getCategories } from "@/services/category.service";

export const useCategories = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/categories", getCategories);
  return { categories: data, isLoading, error, mutate };
};
