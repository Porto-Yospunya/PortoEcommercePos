import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseUUID, stringifyUUID } from "@/lib/uuid";
import { $Enums } from "@/generated/prisma";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  console.log(`GET /organization/${id} API called`);

  try {
    const organization = await prisma.organizations.findFirst({
      where: { id: parseUUID(id) },
      include: { addresses: true },
    });

    if (!organization) {
      return NextResponse.json(
        { message: "Organization not found" },
        { status: 404 }
      );
    }

    const data = {
      id: stringifyUUID(organization.id),
      name: organization.name,
      taxId: organization.tax_id,
      type: organization.type,
      contactName: organization.contact_name,
      contactPhone: organization.contact_phone,
      address: organization.addresses.map((address) => ({
        line1: address.line1,
        line2: address.line2,
        phone: address.phone,
        sub_district: address.sub_district,
        district: address.district,
        province: address.province,
        postal_code: address.postal_code,
        country: address.country,
      })),
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

export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  console.log(`PUT /organization/${id} API called`);

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

    await prisma.organizations.update({
      where: { id: parseUUID(id) },
      data: {
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
      { message: "Updated organization successfully" },
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
