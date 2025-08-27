import axios from "axios";
import { BASE_URL } from "@/constants/app.config";
import { StockReceivedItemSchemaType, StockReceivedSchemaType } from "@/schemas/stock-received.schema";

export const getStockReceiveds = async () => {
  try {
    const res = await axios.get<StockReceivedSchemaType[]>(`${BASE_URL}/stock-in`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
}

export const getStockReceivedItems = async (id: string) => {
  try {
    const res = await axios.get<StockReceivedItemSchemaType[]>(`${BASE_URL}/stock-in/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
}