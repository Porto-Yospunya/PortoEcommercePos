"use server";

import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/utils/upload-image";
import { parse, stringify } from "@/lib/uuid";
import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// Get user by id
export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  console.log(`GET /users/${id} API called`);

  try {
    const user = await prisma.users.findFirst({
      where: { id: parse(id) },
      select: {
        id: true,
        name: true,
        full_name: true,
        image: true,
        email: true,
        phone: true,
        role: true,
        organizations: true,
      },
    });

    // Check valid user
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { full_name, organizations, ...reset } = user;

    // Determine form data
    const data = {
      ...reset,
      id: stringify(user.id),
      fullName: full_name,
      organization:
        organizations !== null ? {
          id: stringify(organizations.id),
          name: organizations?.name
        } : null,
    };

    return NextResponse.json(data);
  } catch (err) {
    console.error("Database query error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

// Update user
export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  console.log(`PUT /users/${id} API called`);

  try {
    const binaryId = parse(id);

    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const fullName = formData.get("fullName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const organizationId = formData.get("organizationId")?.toString() || "";
    // const line1 = formData.get("line1")?.toString() || "";
    // const line2 = formData.get("line2")?.toString() || "";
    // const addressPhone = formData.get("addressPhone")?.toString() || "";
    // const subDistrict = formData.get("subDistrict")?.toString() || "";
    // const district = formData.get("district")?.toString() || "";
    // const province = formData.get("province")?.toString() || "";
    // const postalCode = formData.get("postalCode")?.toString() || "";
    // const country = formData.get("country")?.toString() || "";
    const file = formData.get("image") as File | null;

    // Upload image
    let imageUrl = await uploadImage(file, "users");

    // Find user
    const user = await prisma.users.findFirst({
      where: { id: binaryId },
    });

    // Check user is already
    if (user?.image) {
      if (imageUrl === "") {
        imageUrl = user.image;
      } else {
        const oldImagePath = path.join(process.cwd(), "public", user.image);

        try {
          await unlink(oldImagePath);
        } catch (err) {
          console.warn("Can't delete image: ", err);
        }
      }
    }

    // Update user and address
    await prisma.users.update({
      where: { id: binaryId },
      data: {
        name: name,
        full_name: fullName,
        email: email,
        phone: phone,
        organization_id: parse(organizationId),
        image: imageUrl,
      },
    });

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Database query error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
