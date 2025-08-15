"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserRound, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

export const Navbar = () => {

  const pathname = usePathname();
  const { data: session } = useSession();

  const options = [
    { label: "Home", href: "/", },
    { label: "Shop", href: "/shop", },
    { label: "About", href: "/about", },
  ];

  return !pathname.startsWith("/admin") ? (
    <nav className="flex justify-between">
      <div>
        .Logo
      </div>
      <div className="flex gap-2">
        {options.map((option) => (
          <Link
            key={option.href}
            {...option}
            className=""
          >
            {option.label}
          </Link>
        ))}
      </div>
      {session ? (
        <div className="flex">
          <Link href={`/customer/cart`}><ShoppingCart /></Link>
          <Link href={`/customer/account`}><UserRound /></Link>
        </div>
      ) : (
        <div>
          <Link href="/sign-in">Sign In</Link>
        </div>
      )}
    </nav>
  ) : null;
}