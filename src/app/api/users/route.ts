"use server";

import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import { generate, stringify } from "@/lib/uuid";

export const GET = async () => {
  console.log("GET /users API called");
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        full_name: true,
        image: true,
        email: true,
        phone: true,
        role: true,
        organization_id: true,
      }
    });

    const data = users.map(({ full_name, organization_id, ...reset }) => ({
      ...reset,
      id: stringify(reset.id),
      fullName: full_name,
      organizationId:
        organization_id !== null
          ? stringify(organization_id)
          : null,
    }));

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

// Insert or register user
export const POST = async (req: NextRequest) => {
  console.log("POST /users API called");
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirmPassword")?.toString() || "";

    // Check user duplicate
    const user = await prisma.users.findFirst({
      where: { OR: [{ name }, { email }] },
    });

    if (user?.name) {
      return NextResponse.json(
        { message: "Username already in use" },
        { status: 400 }
      );
    }

    if (user?.email) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    // Check password matching
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Password is not match" },
        { status: 400 }
      );
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Create user and initial address
    await prisma.users.create({
      data: {
        id: generate(),
        name: name,
        email: email,
        password: hashed,
      },
    });

    return NextResponse.json(
      { message: "Created user successfully" },
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
