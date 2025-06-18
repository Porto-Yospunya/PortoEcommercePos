"use server";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";
import { UserRowDataPacket } from "@/types/uesr.type";
import { queryBuilder } from "@/lib/query-builder";

export const GET = async () => {
  try {
    const { sql } = queryBuilder.selectAll("users");

    const [rows] = await pool.query<UserRowDataPacket[]>(sql);
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
    const { username, email, password, role } = await req.json();
    const hashPassword = await bcrypt.hash(password, 10);
    const { sql, values } = queryBuilder.insert("users", {
      username: username,
      email: email,
      password: hashPassword,
      role: role,
    });

    await pool.query(sql, values);
    return NextResponse.json(
      { message: "User created successfully" },
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
