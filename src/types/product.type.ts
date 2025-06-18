import { RowDataPacket } from "mysql2/promise";

export type ProductType = {
  product_id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  created_at: Date;
}

export type ProductRowDataPacket = ProductType & RowDataPacket;