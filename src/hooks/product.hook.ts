import useSWR from "swr";
import { getProducts } from "@/services/product.service";

export const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/products", getProducts);
  return { products: data, error, isLoading, mutate };
}