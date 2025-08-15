"use client";

import { signOut, useSession } from "next-auth/react";

export default function Account() {

  const { data: session } = useSession();

  return (
    <div>
      <div>Welcom to Store: {session?.user?.name}</div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}