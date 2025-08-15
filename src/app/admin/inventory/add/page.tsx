"use client";

import Link from "next/link";
import { ProductForm } from "@/components/admin/inventory/form";
import { PanelField } from "@/components/ui/panel";
import { productSchemaValue } from "@/schemas/product.schema";

export default function Add() {
  return (
    <PanelField
      title="New Product"
      button={
        <Link
          href="/admin/inventory"
          className="btn-red-500 hover:btn-red-800"
        >
          Cancel
        </Link>
      }
    >
      <ProductForm initialData={productSchemaValue} />
    </PanelField>
  );
}