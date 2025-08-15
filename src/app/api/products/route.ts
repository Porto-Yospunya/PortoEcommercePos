"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generate, stringify } from "@/lib/uuid";
import { uploadImage } from "@/utils/upload-image";

export const GET = async () => {
  try {
    const products = await prisma.products.findMany({
      select: {
        id: true,
        sku: true,
        name: true,
        image: true,
        description: true,
        stock: true,
        price: true,
        stock_min: true,
        units: { select: { id: true, name: true } },
        categories: { select: { id: true, name: true } }
      },
      orderBy: {
        name: "asc",
      },
    });

    const data = products.map(({ categories, units, stock_min, ...reset }) => ({
      ...reset,
      id: stringify(reset.id), 
      stockMin: stock_min,
      unit: units,
      category: categories,
    }));

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=30",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  console.log("POST /products API called");
  try {
    const formData = await req.formData();

    const sku = formData.get("sku")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const stock = parseInt(formData.get("stock")?.toString() || "0");
    const stockMin = parseInt(formData.get("stockMin")?.toString() || "0");
    const price = parseFloat(formData.get("price")?.toString() || "0.00");
    const unitId = parseInt(formData.get("unitId")?.toString() || "");
    const categoryId = parseInt(formData.get("categoryId")?.toString() || "");
    const file = formData.get("image") as File | null;

    // Upload image
    const imageUrl = await uploadImage(file, "products");

    await prisma.products.create({
      data: {
        id: generate(),
        sku: sku,
        name: name,
        image: imageUrl,
        description: description,
        stock: stock,
        stock_min: stockMin,
        price: price,
        unit_id: unitId,
        category_id: categoryId,
      },
    });

    return NextResponse.json(
      { message: "Created products successfully" },
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
