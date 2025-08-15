import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NEXTAUTH_SECRET } from "@/constants/app.config";
import { comparePassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import { stringify } from "@/lib/uuid";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.users.findFirst({
            where: { email: credentials?.email },
          });

          if (!user) return null;

          const isValid = await comparePassword(
            user.password,
            credentials?.password ?? "",
          );

          if (!isValid) return null;

          return {
            id: stringify(user.id),
            name: user.name,
            email: user.email,
            role: user.role as "admin" | "cashier" | "customer",
            image: user.image,
          };
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.image;
      }
      return session;
    },
  },
};
