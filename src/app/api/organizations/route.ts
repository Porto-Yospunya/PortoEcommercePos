import { $Enums } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { generate, stringify } from "@/lib/uuid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const organizations = await prisma.organizations.findMany({
      include: {
        addresses: true,
      },
    });

    const data = organizations.map((organization) => ({
      id: stringify(organization.id),
      name: organization.name,
      taxId: organization.tax_id,
      type: organization.type,
      contactName: organization.contact_name,
      contactPhone: organization.contact_phone,
      address: organization.addresses.map((address) => ({
        line1: address.line1,
        line2: address.line2,
        phone: address.phone,
        subDistrict: address.sub_district,
        district: address.district,
        province: address.province,
        postalCode: address.postal_code,
        country: address.country,
      })),
    }));

    return NextResponse.json(data);
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
    const taxId = formData.get("taxId")?.toString() || "";
    const type = formData.get("type") as $Enums.organizations_type;
    const contactName = formData.get("contactName")?.toString() || "";
    const contactPhone = formData.get("contactPhone")?.toString() || "";

    const line1 = formData.get("line1")?.toString() || "";
    const line2 = formData.get("line2")?.toString() || "";
    const addressPhone = formData.get("addressPhone")?.toString() || "";
    const subDistrict = formData.get("subDistrict")?.toString() || "";
    const district = formData.get("district")?.toString() || "";
    const province = formData.get("province")?.toString() || "";
    const postalCode = formData.get("postalCode")?.toString() || "";
    const country = formData.get("country")?.toString() || "";

    const organization = await prisma.organizations.findFirst({
      where: { name: name },
    });

    if (organization?.name) {
      return NextResponse.json(
        { message: "Organization already in use" },
        { status: 400 }
      );
    }

    await prisma.organizations.create({
      data: {
        id: generate(),
        name: name,
        tax_id: taxId,
        type: type,
        contact_name: contactName,
        contact_phone: contactPhone,
        addresses: {
          create: {
            line1: line1,
            line2: line2,
            phone: addressPhone,
            sub_district: subDistrict,
            district: district,
            province: province,
            postal_code: postalCode,
            country: country,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Created organization successfully" },
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
