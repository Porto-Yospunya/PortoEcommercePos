import { getUnits } from "@/services/unit.service";
import useSWR from "swr"

export const useUnits = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/units", getUnits);
  return { units: data, isLoading, error, mutate };
}