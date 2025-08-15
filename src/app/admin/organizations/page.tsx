"use client";

import { Pagination, usePagination } from "@/components/ui/pagination";
import { SearchField } from "@/components/ui/search";
import { TableField } from "@/components/ui/table";
import { useOrganizationContext } from "@/contexts/organization.context";
import { ChangeEvent, useState } from "react";

const headers = [
  { label: "Name", key: "name" },
  { label: "Type", key: "type" },
  { label: "Contact", key: "contactName" },
  { label: "Phone", key: "contactPhone" },
  { label: "Details", key: "id", link: "/admin/organizations" },
];

export default function Organizations() {

  const { organizations, isLoading } = useOrganizationContext();
  const [search, setSearch] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const searchOrganizations = organizations ? organizations.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase()) ||
    org?.contactName?.toLowerCase().includes(search.toLowerCase()) ||
    org?.contactPhone?.toLowerCase().includes(search.toLowerCase())
  ): [];

  const pagination = usePagination({ data: searchOrganizations, page: 10 });

  return (
    <div className="grid gap-4">

      <div>
        <h1 className="text-2xl font-semibold">Organization Management</h1>
      </div>

      <div className="grid bg-white border-2 border-gray-200">

        <div className="p-4">
          <SearchField onSearchChange={handleSearchChange} />
        </div>

        <TableField
          data={searchOrganizations}
          headers={headers}
          colWidth={["w-8", "w-8", "w-8", "w-8", "w-8"]}
          isLoading={isLoading}
        />

        <Pagination {...pagination} />
      </div>

    </div>
  );
}