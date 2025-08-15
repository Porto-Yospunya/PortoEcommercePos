"use server";

import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/utils/upload-image";
import { parse, stringify } from "@/lib/uuid";
import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// Get product by id
export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;

  try {
    const product = await prisma.products.findFirst({
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
      where: { id: parse(id) },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const { stock_min, categories, units, ...reset } = product;

    const data = {
      ...reset,
      id: stringify(product.id),
      stockMin: stock_min,
      category: categories,
      unit: units,
    };

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revelidate-30",
      },
    });
  } catch (err) {
    console.error("Database query error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  console.log(`PUT /products/${id} API called`);

  try {
    const binaryId = parse(id);

    const formData = await req.formData();

    const sku = formData.get("sku")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const stock = parseInt(formData.get("stock")?.toString() || "0");
    const stockMin = parseInt(formData.get("stockMin")?.toString() || "0");
    const price = parseFloat(formData.get("price")?.toString() || "0.00");
    const unitId = parseInt(formData.get("unitId")?.toString() || "0");
    const categoryId = parseInt(formData.get("categoryId")?.toString() || "0");
    const file = formData.get("image") as File | null;

    if (!name || categoryId === 0) {
      return NextResponse.json(
        { message: "Missing required fields or invalid category" },
        { status: 400 }
      );
    }

    let imageUrl = await uploadImage(file, "products");

    const product = await prisma.products.findFirst({
      where: { id: binaryId },
    });

    if (product?.image) {
      if (imageUrl === "") {
        imageUrl = product.image;
      } else {
        const oldImagePath = path.join(process.cwd(), "public", product.image);

        try {
          await unlink(oldImagePath);
        } catch (err) {
          console.warn("Can't delete image: ", err);
        }
      }
    }

    await prisma.products.update({
      where: { id: binaryId },
      data: {
        sku: sku,
        name: name,
        image: imageUrl,
        description: description,
        stock: stock,
        stock_min: stockMin,
        price: price,
        category_id: categoryId,
        unit_id: unitId,
      },
    });

    return NextResponse.json(
      { message: "Prouduct updated successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("PUT /products error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  console.log(`DELETE /products/${id} API called`);

  try {
    const binaryId = parse(id);

    const product = await prisma.products.findFirst({
      where: { id: binaryId },
    });

    if (product?.image) {
      const imagePath = path.join(process.cwd(), "public", product.image);

      try {
        await unlink(imagePath);
        console.log("Deleted image");
      } catch (err) {
        console.warn("Can't delete image: ", err);
      }
    }

    await prisma.products.delete({ where: { id: binaryId } });
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (err) {
    console.error("DELETE /products error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
