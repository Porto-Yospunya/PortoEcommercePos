"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { BellIcon, ChevronDown, MailIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import profile from "@/assets/profile.png";

export const TopHeader = () => {

  const pathname = usePathname();
  const { data: session } = useSession();
  const segments = pathname.split("/").filter(Boolean);
  const [active, setActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { href: "/admin/mail", icon: <MailIcon /> },
    { href: "/admin/notify", icon: <BellIcon /> },
  ];

  const handleClockOutSide = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setActive(false);
    }
  }

  useEffect(() => {
    if (active) {
      document.addEventListener("mousedown", handleClockOutSide);
    } else {
      document.removeEventListener("mousedown", handleClockOutSide);
    }

    return () => {
      document.removeEventListener("mousedown", handleClockOutSide);
    }
  }, [active]);

  return (
    <div className="relative flex justify-between h-12 items-center px-4 bg-white border-b-2 border-gray-200 z-30">
      <div className="text-gray-500">
        <Link href="/">Home </Link>
        {segments.map((segment, index) => {

          const href = "/" + segments.slice(0, index + 1).join("/");
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);
          const isLast = index === segments.length - 1;

          return (
            <span key={href}>
              <span> / </span>
              {isLast ? (
                <span className="text-blue-500 font-semibold">{label}</span>
              ) : (
                <Link
                  href={href}
                >
                  {label}
                </Link>
              )}
            </span>
          );
        })}
      </div>
      <div className="relative flex gap-4 items-center text-gray-500" ref={dropdownRef}>
        {options.map((option) => (
          <Link
            href={option.href}
            key={option.href}
          >
            {option.icon}
          </Link>
        ))}

        <div className="flex items-center gap-2 w-full">
          <Image
            className="border-2 border-gray-200 rounded-full"
            src={session?.user.image || profile}
            alt="Profile"
            width={32}
            height={32}
          />
          <button
            onClick={() => setActive(!active)}
            className="hover:bg-gray-100 p-1 rounded transition-all"
          >
            <ChevronDown width={16} height={16} />
          </button>
        </div>

        {active && (
          <div className="absolute min-w-72 max-w-88 w-fit top-10 right-0 bg-white border-2 border-gray-200 my-4 p-2 rounded gap-2">
            <div className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded">
              <Image
                className="rounded-full w-fit h-fit"
                src={session?.user.image || profile}
                alt="Profile"
                width={56}
                height={56}
              />

              <div className="grid gap-0.5">
                <span className="font-semibold text-lg">{session?.user.name}</span>
                <span className="text-gray-500 text-sm">{session?.user.role === "admin" && "Admin Manager"}</span>
                <span className="text-gray-500 text-sm">{session?.user.email}</span>
              </div>
            </div>
            <div className="grid">
              <h1 className="text-xs text-gray-500 px-3 py-1">Your accounts</h1>
              <Link className="text-left font-semibold hover:bg-gray-100 px-3 py-1 rounded cursor-pointer" href="/admin/account">Profile</Link>
              <button onClick={() => signOut({ callbackUrl: "/sign-in" })} className="text-left font-semibold hover:bg-gray-100 px-3 py-1 rounded cursor-pointer">Log out</button>
            </div>
          </div>
        )}
      </div>
    </div >
  );
}