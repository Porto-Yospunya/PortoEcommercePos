"use server"

import axios from "axios";
import { API_VERSION, BASE_URL } from "@/constants/app.config";
import { UserType } from "@/types/uesr.type";

export const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/${API_VERSION}/user`);
  return res.data;
};

export const getUserById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/${API_VERSION}/user/${id}`);
  return res.data;
} 


export const insertUser = async (data: UserType) => {
  const res = await axios.post(`${BASE_URL}/${API_VERSION}/user`, data);
  return res.data;
}