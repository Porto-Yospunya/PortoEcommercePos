"use server";

import { pool } from "@/lib/db";
import { queryBuilder } from "@/lib/query-builder";
import { ProductRowDataPacket } from "@/types/product.type";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { sql } = queryBuilder.selectAll("products");

    const [rows] = await pool.query<ProductRowDataPacket[]>(sql);
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { product_id, name, description, price, stock, category } = await req.json();
    const { sql, values } = queryBuilder.insert("products", {
      product_id,
      name,
      description,
      price,
      stock,
      category
    });

    await pool.query(sql, values);
    return NextResponse.json(
      { message: "Proudct created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
