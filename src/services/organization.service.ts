"use server";

import { BASE_URL } from "@/constants/app.config";
import { OrganizationSchemaType } from "@/schemas/organization.schema";
import axios from "axios";

export const getOrganizations = async () => {
  try {
    const res = await axios.get<OrganizationSchemaType[]>(`${BASE_URL}/organizations`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};
