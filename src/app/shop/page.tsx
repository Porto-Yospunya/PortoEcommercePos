"use client"

import { useProductContext } from "@/contexts/product.context";
import { ItemBox } from "@/components/shop/item-box";

export default function Shop() {

  const { products, categories } = useProductContext();

  return (
    <div>
      {products.length !== 0 ? 
      (products.map((item, index) => (
        <ItemBox {...item} categories={categories} key={index} />
      ))) : (
        <div>Not Found Item</div>
      )}
    </div>
  );
}