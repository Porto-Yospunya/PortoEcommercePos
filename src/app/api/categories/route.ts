"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.categories.findMany();

    if (categories.length === 0) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(categories);
  } catch (err) {
    console.error("Database query error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name")?.toString() || "";
    
    await prisma.categories.create({
      data: { name },
    });
    return NextResponse.json(
      { message: "Category created successfully" },
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
