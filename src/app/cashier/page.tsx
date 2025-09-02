"use client";

import { useProducts } from "@/hooks/product.hook";
import { formatCurrency } from "@/utils/formatter";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

const headers = ["Product Id", "Product Name", "Price", "Q'ty", "Total", "Actions"];

export default function Cashier() {

  const { products } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [sku, setSku] = useState("");
  const [items, setItems] = useState<{
    sku: string;
    name: string;
    price: number;
    quantity: number;
  }[]>();
  
  const [amount, setAmount] = useState(0);
  const [receive, setReceive] = useState(0);

  const handleEnterReceive = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();


    }
  }

  const handleEnterId = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const hasProduct = products ? products.some((product) => product.sku === sku) : false;

    if (event.key === "Enter") {
      event.preventDefault();

      if (sku !== "" && hasProduct) {
        setItems((prev) => {
          const isDuplicate = prev?.some((pre) => pre.sku === sku);
          const price = products?.find((product) => product.sku === sku)?.price ?? 0;

          if (!isDuplicate) {
            const product = products?.find((product) => product.sku === sku);

            if (!product) return prev ?? [];
            const newItem = {
              sku: sku,
              id: product.id,
              name: product.name,
              price,
              quantity,
            };
            return [newItem, ...(prev ?? [])];
          }

          return (prev ?? []).map((pre) =>
            pre.sku === sku
              ? { ...pre, quantity: pre.quantity + quantity, price }
              : pre
          );
        });
      } else {
        window.alert(`Not found product id ${sku}`);
      }

      setSku("");
    }
  }

  const handleIncreaseItem = (sku: string) => {
    setItems((prev) => {
      return (prev ?? []).map((pre) =>
        pre.sku === sku
          ? { ...pre, quantity: pre.quantity + 1 }
          : pre
      );
    });
  }

  const handleDecreaseItem = (sku: string) => {
    setItems((prev) => {
      return (prev ?? []).map((pre) =>
        pre.sku === sku
          ? { ...pre, quantity: pre.quantity > 1 ? pre.quantity - 1 : 1 }
          : pre
      );
    });
  }

  const handleDeleteItem = (index: number) => {
    if (items?.length === 0) return;

    setItems((prev) => (prev ?? []).filter((_, i) => i !== index))
  }

  useEffect(() => {
    setAmount(items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) ?? 0);
  }, [items]);

  return (
    <div className="flex w-full h-full p-4 gap-4">
      <div className="h-full w-2/3 flex flex-col gap-4">
        <div className="bg-white border-2 border-gray-200 p-4 flex gap-4">
          <div className="label w-full">
            <input
              type="text"
              value={sku}
              onKeyDown={handleEnterId}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setSku(event.target.value)}
            />
          </div>

          <div className="label w-20">
            <input
              type="number"
              className="w-full"
              defaultValue={1}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setQuantity(Number(event.target.value))}
            />
          </div>
        </div>
        <div className="bg-white border-2 border-gray-200 h-full">

          <div className="overflow-y-auto max-h-[calc(50vh-3.5rem)] bg-white">
            <table className="table-field w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  {headers.map((label, index) => (
                    <th
                      key={index}
                      className={`
                text-gray-500 text-left sticky top-0 z-20 bg-white
                  `}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items?.map((item, index) => {
                  return (
                    <tr key={index} className="border-b border-gray-200">
                      <td>{item.sku}</td>
                      <td>{item.name}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>
                        <div className="flex gap-2 items-center">
                          <button onClick={() => handleDecreaseItem(item.sku)} className="hover:bg-gray-200 h-fit p-0.5 rounded cursor-pointer"><Minus width={16} height={16} /></button>
                          <span>
                            <input
                              type="text"
                              className="w-8 px-1 text-center"
                              value={item.quantity}
                              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const value = Number(event.target.value);
                                setItems((prev) => {
                                  return (prev ?? []).map((pre) =>
                                    pre.sku === item.sku
                                      ? { ...pre, quantity: value }
                                      : pre
                                  );
                                });
                              }}
                            />
                          </span>
                          <button onClick={() => handleIncreaseItem(item.sku)} className="hover:bg-gray-200 h-fit p-0.5 rounded cursor-pointer"><Plus width={16} height={16} /></button>
                        </div>
                      </td>
                      <td>{formatCurrency(item.quantity * item.price)}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteItem(index)}
                          className="border-2 border-gray-200 p-1 rounded mx-1 hover:bg-gray-200 hover:text-black text-red-500 cursor-pointer"
                        >
                          <Trash2 width={20} height={20} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>
      <div className="w-1/3">

        <div className="bg-white p-4 grid gap-4">
          <div className="py-2">
            <p className="">Total Amount</p>
            <h1 className="text-5xl font-semibold text-blue-500">{formatCurrency(amount)}</h1>
          </div>
          <div className="border-b-2 border-gray-200 py-2 w-full">
            <p className="">Receive Payment</p>
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) => setReceive(Number(event.target.value))}
              onKeyDown={handleEnterReceive}
              className="outline-none text-5xl font-semibold"
              type="number"
            />
          </div>
          <div>
            <p className="">Change</p>
            <h1 className="text-5xl font-semibold text-green-500">{formatCurrency(0)}</h1>
          </div>
        </div>

      </div>
    </div>
  );
}