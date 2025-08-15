"use client";

import { PanelField } from "@/components/ui/panel";
import { UserSchemaType } from "@/schemas/user.schema";
import { getUserById } from "@/services/user.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetails() {
  
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserSchemaType>();

  useEffect(() => {
    getUserById(id)
      .then((res) => setUser(res))
      .catch((err) => console.error(err))
  }, []);
  
  return (
    <PanelField
      title="Detail User"
    >
      <div>
        {user?.name}
      </div>
    </PanelField>
  );
}