"use server";

import axios from "axios";
import { BASE_URL } from "@/constants/app.config";
import { CategoryType } from "@/types/category.type";

export const getCategories = async () => {
  try {
    const res = await axios.get<CategoryType[]>(`${BASE_URL}/categories`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const res = await axios.get<CategoryType>(`${BASE_URL}/categories/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};
