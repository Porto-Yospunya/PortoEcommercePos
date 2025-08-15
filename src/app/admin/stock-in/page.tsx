"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Pagination, usePagination } from "@/components/ui/pagination";
import { SearchField } from "@/components/ui/search";
import { useUserContext } from "@/contexts/user.context";
import { formatCurrency } from "@/utils/formatter";
import { formatDatetime } from "@/utils/formatter";
import { parseId2Name } from "@/utils/parse";

export default function StockIn() {

  const { users } = useUserContext();
  const { receipts } = useReceiptContext();

  const [search, setSearch] = useState("");
  const [activeModal, setActiveModal] = useState(false);

  const totalPrice = formatCurrency((items.reduce((sum, item) => (item.unit_cost * item.quantity) + sum, 0)));
  const totalAmount = (items.reduce((sum, item) => item.quantity + sum, 0)).toLocaleString();

  const filterReceipts = receipts.filter((receipt) => receipt.ref_code.toLowerCase().includes(search));

  const pagination = usePagination({ data: filterReceipts, page: 100 });

  return (
    <div className="grid gap-4">

      <h1 className="font-semibold text-2xl">Stock-In List</h1>

      <div className="grid bg-white border-2 border-gray-200">
        <div className="grid grid-cols-2 p-4">
          <SearchField onSearchChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />
          <Link
            href="/admin/stock-in/add"
            className="btn-blue-500 hover:btn-blue-800 flex items-center justify-self-end"
          >
            New Stock In
          </Link>
        </div>

        {/* <ReceiptTable receipts={filterReceipts} setItems={setItems} setReceipt={setReceipt} onToggleModal={setActiveModal} /> */}

        {filterReceipts.length === 0 && (
          <div className="flex w-full justify-center my-4 py-2 bg-gray-100 rounded text-gray-600">Not Found Stock In</div>
        )}

        <Pagination {...pagination} />
      </div>
    </div>
  );
}