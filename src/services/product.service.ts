"use server";

import axios from "axios";
import { BASE_URL } from "@/constants/app.config";
import { toFormData } from "@/utils/formdata";
import { CreateProductSchemaType, ProductSchemaType, UpdateProductSchemaType } from "@/schemas/product.schema";

export const getProducts = async () => {
  try {
    const res = await axios.get<ProductSchemaType[]>(`${BASE_URL}/products`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};

export const getProductById = async (id: string) => {
  try {
    const res = await axios.get<ProductSchemaType>(`${BASE_URL}/products/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};

export const insertProducts = async (data: CreateProductSchemaType) => {
  try {
    const formData = toFormData({
      sku: data.sku,
      name: data.name,
      description: data.description,
      stock: data.stock,
      stockMin: data.stockMin,
      price: data.price,
      unitId: data.unit.id,
      categoryId: data.category.id,
    });

    if (data.image) {
      formData.append("image", data.image);
    }

    const res = await axios.post(`${BASE_URL}/products`, formData);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};

export const updateProduct = async (data: UpdateProductSchemaType) => {
  try {
    const formData = toFormData({
      sku: data.sku,
      name: data.name,
      description: data.description,
      stock: data.stock,
      stockMin: data.stockMin,
      price: data.price,
      unitId: data.unit?.id,
      categoryId: data.category?.id,
    });

    if (data.image) {
      formData.append("image", data.image);
    }

    const res = await axios.put(`${BASE_URL}/products/${data.id}`, formData);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/products/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};
