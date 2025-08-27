import { getStockReceiveds } from "@/services/stock-in.service";
import useSWR from "swr";

export const useStockReceived = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/stock-in", getStockReceiveds);
  return { stockReceived: data, error, isLoading, mutate } ;
}