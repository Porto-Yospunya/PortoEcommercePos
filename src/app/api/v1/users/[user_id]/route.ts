"use server";

import { pool } from "@/lib/db";
import { queryBuilder } from "@/lib/query-builder";
import { ProductRowDataPacket } from "@/types/product.type";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { user_id: string } }
) => {
  const { user_id } = context.params;

  try {
    const { sql, values } = queryBuilder.selectWhere("products", { user_id });

    const [rows] = await pool.query<ProductRowDataPacket[]>(sql, values);

    if (rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("Database query error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
