"use client";

import useSWR from "swr";
import { User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { UserForm } from "@/components/account/form";
import { getUserById } from "@/services/user.service";
import { userSchemaValue } from "@/schemas/user.schema";

export default function Account() {

  const { data: session } = useSession();

  const { data: user } = useSWR(
    session?.user.id ? ["user", session.user.id] : null,
    ([, userId]) => getUserById(userId),
  )

  return (
    <div className="grid gap-4 p-8">
      <div>
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <User2 />
            <h1 className="text-xl font-semibold">Account</h1>
          </div>
        </div>
        <hr />

        <div className="grid gap-4">
          <h1 className="py-2 text-xl font-semibold">Personal Information</h1>
          <div>
            <UserForm initialData={user ?? userSchemaValue} />
          </div>
          <button
            className="border-2 border-gray-200 font-semibold py-2 transition hover:bg-gray-200 cursor-pointer"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </div>

    </div>
  );
}