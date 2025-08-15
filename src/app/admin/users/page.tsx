"use client";

import { ChangeEvent, useState } from "react";
import { SearchField } from "@/components/ui/search";
import { Pagination, usePagination } from "@/components/ui/pagination";
import { useUserContext } from "@/contexts/user.context";
import { PanelField } from "@/components/ui/panel";
import { TableField } from "@/components/ui/table";
import { UserSchemaType } from "@/schemas/user.schema";
import placeholder from "@/assets/profile.png";

export default function Users() {

  const { users, isLoading } = useUserContext();
  const [search, setSearch] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const searchUsers = users ? users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  ) : [];

  const pagination = usePagination<UserSchemaType>({ data: searchUsers, page: 10 });

  const headers = [
    { label: "Image", key: "image", placeholder: placeholder.src },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Role", key: "role" },
    { label: "Details", key: "id", link: "/admin/users" },
  ];

  const colWidth = ["", "", "", ""]

  const userFormData = pagination.data.map((user) => ({
    id: user.id ?? "",
    image: user.image,
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    role: user.role as "admin" | "cashier" | "customer",
    organization: user.organization?.name ?? "",
  }));

  return (
    <PanelField
      title="User Management"
    >

      <div className="p-4 bg-white">
        <SearchField onSearchChange={handleSearchChange} />
      </div>

      <TableField
        data={userFormData}
        headers={headers}
        colWidth={colWidth}
        isLoading={isLoading}
      />

      <Pagination {...pagination} />
    </PanelField>
  );
}