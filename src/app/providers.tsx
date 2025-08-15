"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/contexts/user.context";
import { OrganizationProvider } from "@/contexts/organization.context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        <OrganizationProvider>
          {children}
        </OrganizationProvider>
      </UserProvider>
    </SessionProvider>
  );
}