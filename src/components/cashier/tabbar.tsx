"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { BellIcon, ChevronDown, MailIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import profile from "@/assets/profile.png";


export const Tabbar = () => {

  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const options = [
    { label: "Cashier", href: "/cashier" },
    { label: "History", href: "/cashier/history" },
  ]

  const alerts = [
    { href: "/cashier/mail", icon: <MailIcon /> },
    { href: "/cashier/notify", icon: <BellIcon /> },
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
    <div className="bg-white">
      <div className="flex justify-between items-center border-gray-200 border-b-2 h-16 px-4">
        <h1 className="text-xl font-semibold">POS Porto Center</h1>
        <div className="relative flex gap-4 items-center text-gray-500" ref={dropdownRef}>
          {alerts.map((alert) => (
            <Link
              href={alert.href}
              key={alert.href}
            >
              {alert.icon}
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
                  <span className="text-gray-500 text-sm">{session?.user.role === "cashier" && "Cashier"}</span>
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
      </div>
      <div className="px-8 flex items-center gap-4 border-gray-200 border-b-2">
        {options.map((option, index) => (
          <Link
            key={index}
            href={option.href}
            onClick={() => setActiveIndex(index)}
            className={`px-4 h-12 flex items-center duration-300 font-semibold
              ${index === activeIndex
                ? "border-b-3 border-blue-500 text-blue-500"
                : "border-none"}`}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}