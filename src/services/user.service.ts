"use server";

import axios from "axios";
import { BASE_URL } from "@/constants/app.config";
import { CreateUserSchemaType, UpdateUserSchemaType, UserSchemaType } from "@/schemas/user.schema";
import { toFormData } from "@/utils/formdata";

export const getUsers = async () => {
  try {
    const res = await axios.get<UserSchemaType[]>(`${BASE_URL}/users`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};

export const getUserById = async (id: string) => {
  try {
    const res = await axios.get<UserSchemaType>(`${BASE_URL}/users/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};

export const insertUser = async (data: CreateUserSchemaType) => {
  try {
    const formData = toFormData({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    const res = await axios.post(`${BASE_URL}/users`, formData);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};

export const updateUser = async (data: UpdateUserSchemaType) => {
  try {
    const formData = toFormData({
      name: data.name,  
      email: data.email,
      phone: data.phone,
      organizationId: data.organizationId,
    });

    if (data.image) {
      formData.append("image", data.image);
    }

    const res = await axios.put(`${BASE_URL}/users/${data.id}`, formData);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};
