"use server";

import { prisma } from "@/lib/prisma";
import { stringify } from "@/lib/uuid";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const stockReceiveds = await prisma.stock_received.findMany({
      select: {
        id: true,
        ref_code: true,
        received_date: true,
        created_by: true,
      },
    });

    const data = stockReceiveds.map((stock) => ({
      id: stringify(stock.id),
      refCode: stock.ref_code,
      receivedDate: stock.received_date,
      createBy: stock.created_by,
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
