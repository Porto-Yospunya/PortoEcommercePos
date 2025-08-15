import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role: "admin" | "cashier" | "customer";
      image: string | null;
    };
  }

  interface User {
    id: string;
    role: "admin" | "cashier" | "customer";
    image: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "admin" | "cashier" | "customer";
    image: string | null;
  }
}
