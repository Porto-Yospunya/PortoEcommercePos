"use server";

import axios from "axios";
import { BASE_URL } from "@/constants/app.config";
import { UnitType } from "@/types/unit.type";

export const getUnits = async () => {
  try {
    const res = await axios.get<UnitType[]>(`${BASE_URL}/units`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};

export const getUnitById = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/units/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};
