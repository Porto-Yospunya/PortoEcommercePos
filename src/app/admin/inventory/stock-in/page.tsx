"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { SearchField } from "@/components/ui/search";
import { PanelField } from "@/components/ui/panel";
import { useStockReceived } from "@/hooks/stock-received.hook";
import { Pagination, usePagination } from "@/components/ui/pagination";


export default function StockIn() {

  const { stockReceived } = useStockReceived();
  const [search, setSearch] = useState("");

  const searchStockReceived = stockReceived ? stockReceived.filter((receipt) => receipt.refCode.toLowerCase().includes(search)) : [];

  const pagination = usePagination({ data: searchStockReceived, page: 100 });

  return (
    <PanelField
      title="Stock-In List"
      button={
        <Link
          href="/admin/inventory"
          className="btn-red-500 hover:btn-red-800"
        >
          Back
        </Link>
      }
    >
      <div className="grid grid-cols-2 p-4">
        <SearchField onSearchChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />
        <Link
          href="/admin/inventory/stock-in/add"
          className="btn-blue-500 hover:btn-blue-800 flex items-center justify-self-end"
        >
          New Stock In
        </Link>
      </div>

      {/* <ReceiptTable receipts={filterReceipts} setItems={setItems} setReceipt={setReceipt} onToggleModal={setActiveModal} /> */}

      {searchStockReceived.length === 0 && (
          <div className="flex w-full justify-center my-4 py-2 bg-gray-100 rounded text-gray-600">Not Found Stock In</div>
        )}

      <Pagination {...pagination} />

    </PanelField>
  );
}