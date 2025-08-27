"use server";

import { prisma } from "@/lib/prisma";
import { parse, stringify } from "@/lib/uuid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;

  try {
    const stockReceived = await prisma.stock_received.findFirst({
      select: {
        id: true,
        ref_code: true,
        received_date: true,
        created_by: true,
        stock_received_items: {
          select: {
            quantity: true,
            unit_cost: true,
            products: {
              select: {
                id: true,
                sku: true,
                name: true,
              },
            },
          },
        },
      },
      where: { id: parse(id) },
    });

    if (!stockReceived) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const { ref_code, received_date, created_by, stock_received_items, ...receiveds } = stockReceived;

    const data = {
      ...receiveds,
      id: stringify(stockReceived.id),
      refCode: ref_code,
      receivedDate: received_date,
      createdBy: created_by,
      items: stock_received_items.map(({ unit_cost, products,...items }) => ({
        ...items,
        unitCost: unit_cost,
        productId: stringify(products.id),
        productSku: products.sku,
        productName: products.name,
      })),
    };

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
