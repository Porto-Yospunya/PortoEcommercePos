import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const units = await prisma.units.findMany();

    if (units.length === 0) {
      return NextResponse.json(
        { message: "Unit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(units);
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

    await prisma.units.create({
      data: { name },
    });
    return NextResponse.json(
      { message: "Unit created successfully" },
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
