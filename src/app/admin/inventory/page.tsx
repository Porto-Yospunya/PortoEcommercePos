"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { TriangleAlert, ChevronDown, ListFilter } from "lucide-react";
import { deleteProduct } from "@/services/product.service";
import { Modal } from "@/components/ui/modal";
import { Pagination, usePagination } from "@/components/ui/pagination";
import { SearchField } from "@/components/ui/search";
import { TableField } from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatter";
import { StockStatus } from "@/components/admin/inventory/stock-status";
import { PanelField } from "@/components/ui/panel";
import { useProducts } from "@/hooks/product.hook";
import placeholder from "@/assets/box.png";
import { ProductSchemaType } from "@/schemas/product.schema";

type ProductFormDataType = {
  id: string;
  sku: string;
  name: string;
  image: string;
  description?: string;
  price: string;
  stock: string;
  status: React.ReactNode;
  category: string;
  unit: string;
}

export default function Inventory() {

  const [search, setSearch] = useState("");
  const [activeModal, setToggleModal] = useState(false);
  const [item, setItem] = useState<ProductFormDataType>();

  const { products, isLoading, mutate } = useProducts();

  const searchInventory = products ? products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.sku.toLowerCase().includes(search.toLowerCase())
  ) : [];

  const handleToggleModal = (item?: ProductFormDataType) => {
    setToggleModal(!activeModal);
    setItem(item);
  }

  const handleDeleteData = async (item?: ProductFormDataType) => {
    try {
      if (!item) return;
      const res = await deleteProduct(item.id);
      console.log(res);
      setToggleModal(!activeModal);
      mutate();
    } catch (err) {
      console.error(err);
    }
  }

  const hanldeSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const pagination = usePagination<ProductSchemaType>({ data: searchInventory, page: 100 });

  const productFormData: ProductFormDataType[] = pagination.sliceData.map((product) => ({
    id: product.id ?? "",
    sku: product.sku,
    name: product.name,
    image: product.image,
    description: product.description,
    price: formatCurrency(Number(product.price)),
    stock: product.stock.toLocaleString(),
    status: <StockStatus stock={Number(product.stock)} min={Number(product.stockMin)} />,
    category: product.category.name,
    unit: product.unit.name,
  }));

  const headers = [
    { label: "Image", key: "image", placeholder: placeholder.src },
    { label: "ID", key: "sku" },
    { label: "Name", key: "name" },
    { label: "Price", key: "price" },
    { label: "Stock", key: "stock" },
    { label: "Unit", key: "unit" },
    { label: "Status", key: "status" },
    { label: "Category", key: "category" },
    { label: "Actions", key: "id", link: "/admin/inventory/add", onClick: (item: ProductFormDataType) => !activeModal && handleToggleModal(item) }
  ];

  const colWidth = ["w-1/12", "w-1/6", "w-1/4", "w-1/10", "w-1/10", "w-1/10", "w-1/8", "w-1/8", "w-1/10"];

  return (
    <PanelField
      title="Inventory Management"
      modal={
        <Modal active={activeModal} >
          <div className="bg-white p-6 rounded-md shadow-lg border border-gray-200 grid max-w-md w-full gap-4">
            <div className="flex items-center gap-2"><TriangleAlert className="w-5 h-5 text-red-600" /><div className="font-semibold text-xl text-red-600">Confrim to delete product</div></div>
            <hr className="border-gray-200" />
            <div className="grid gap-4">
              <p>Are you sure to delete <span className="font-semibold">{item?.name}</span> ?</p>
              <p className="text-sm text-gray-500">This action cannot be undone.</p>
            </div>
            <div className="flex gap-4 justify-end">
              <button className="cursor-pointer px-2 py-1 rounded text-white bg-red-600 hover:bg-red-700 transition" onClick={() => handleDeleteData(item)}>Confirm</button>
              <button className="cursor-pointer px-2 py-1 rounded text-gray-800 bg-gray-200 hover:bg-gray-300 transition" onClick={() => activeModal && handleToggleModal()}>Cancel</button>
            </div>
          </div>
        </Modal>
      }
    >
      <div className="grid grid-cols-2 p-4">

        <SearchField onSearchChange={hanldeSearchChange}>
          <div className="flex items-center gap-2 border-2 border-gray-200 bg-gray-50 p-2 text-gray-500">
            <span className="flex items-center gap-2">
              <ListFilter width={20} height={20} />
              Filters
            </span>
            <span><ChevronDown width={16} height={16} /></span>
          </div>
        </SearchField>

        <div className="flex gap-2 justify-end">
          <Link
            href="/admin/inventory/stock-in"
            className="flex items-center w-fit text-white btn-yellow-500 hover:btn-yellow-800"
          >
            Stock In
          </Link>

          <Link
            href="/admin/inventory/add"
            className="flex items-center w-fit text-white btn-blue-500 hover:btn-blue-800"
          >
            New Products
          </Link>
        </div>

      </div>

      <TableField<ProductFormDataType>
        data={productFormData}
        headers={headers}
        colWidth={colWidth}
        isLoading={isLoading}
      />

      <Pagination {...pagination} />
    </PanelField>
  );
}