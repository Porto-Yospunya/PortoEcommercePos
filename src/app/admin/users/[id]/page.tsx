"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { PanelField } from "@/components/ui/panel";
import { getUserById } from "@/services/user.service";
import placeholder from "@/assets/profile.png";

export default function UserDetails() {

  const { id } = useParams<{ id: string }>();

  const { data: user, isLoading } = useSWR(
    id ? ["user", id] : null,
    ([, userId]) => getUserById(userId)
  );


  return (
    <div className="grid">
      <PanelField
        title="User Profile"
        button={
          <Link
            href="/admin/users"
            className="btn-red-500 hover:btn-red-800"
          >
            Cancel
          </Link>
        }
      >
        <div className="p-4 flex gap-4">
          <div className="grid gap-2 w-60">
            <Image
              src={user?.image || placeholder}
              alt="Not image"
              width={128}
              height={128}
              className="object-cover block mx-auto"
            />
            <div className="text-center">
              <h1 className="font-semibold">{user?.fullName}</h1>
              <p>{user?.name}</p>
            </div>
          </div>

          <div className="flex flex-col border-l-2 border-gray-200 px-4">
            <div className="grid gap-1">
              <h1 className="font-medium">User Profile</h1>
              <p>Email Address: {user?.email}</p>
              <p>Phone Number: {user?.phone ?? "-"}</p>
              <p>Role: {user?.role}</p>
              <p>Organization: {user?.organization?.name ?? "-"}</p>
            </div>
          </div>
        </div>
      </PanelField>
      
      <PanelField
        title=""
      >
        <div className="p-4">
          <h1>User Addresses</h1>
        </div>
      </PanelField>
    </div>
  );
}