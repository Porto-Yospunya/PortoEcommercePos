"use client";

import Link from "next/link";
import useSWR from "swr";
import { ProductForm } from "@/components/admin/inventory/form";
import { useParams } from "next/navigation";
import { PanelField } from "@/components/ui/panel";
import { getProductById } from "@/services/product.service";

export default function Edit() {

  const { id } = useParams<{ id: string }>();

  const { data: product } = useSWR(
    id ? ["product", id] : null,
    ([, productId]) => getProductById(productId),
  );

  return (
    <PanelField
      title="Edit Product"
      button={
        <Link
          href="/admin/inventory"
          className="btn-red-500 hover:btn-red-800"
        >
          Cancel
        </Link>
      }
    >
      <ProductForm initialData={product} />
    </PanelField>
  );
}