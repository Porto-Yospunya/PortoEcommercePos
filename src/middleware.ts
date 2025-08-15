import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/cashier")) {
    if (token?.role !== "cashier") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/customer")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/cashier/:path*"],
};
