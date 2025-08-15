"use client";

import { CategoryType } from "@/types/category.type";
import { ProductType } from "@/types/product.type";
import { categoryNum2Str } from "@/utils/parse-category";
import Image from "next/image";

export const ItemBox = (props: ProductType & { categories: CategoryType[] }) => {
  return (
    <div>
      <div className="relative">
        <Image
          src={props.image || "/placeholder.jpg"}
          alt="Product image"
          width={256}
          height={192}
          className="object-cover"
        />
      </div>
      <div>{props.name}</div>
      <div>{categoryNum2Str(props.category_id, props.categories)}</div>
    </div>
  );
}