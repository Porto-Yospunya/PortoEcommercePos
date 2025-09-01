"use client";

import Link from "next/link";
import { useState } from "react";
import { LayoutDashboardIcon, ArchiveIcon, LucideUsersRound, Building2Icon, Package2, Settings, Receipt, Logs } from "lucide-react";

export const Sidebar = () => {

  const [activeIndex, setActiveIndex] = useState({ header: 0, sub: 0 });

  const options = [
    {
      header: "Display",
      suboptions: [
        { icon: <LayoutDashboardIcon />, label: "Dashboard", href: "/admin", },
      ],
    },
    {
      header: "Storage",
      suboptions: [
        { icon: <ArchiveIcon />, label: "Inventory", href: "/admin/inventory", },
        { icon: <Package2 />, label: "Orders", href: "/admin/orders", },
        { icon: <Receipt />, label: "Returns", href: "/admin/returns", },
      ],
    },
    {
      header: "User & Organization",
      suboptions: [
        { icon: <LucideUsersRound />, label: "Users", href: "/admin/users", },
        { icon: <Building2Icon />, label: "Organizations", href: "/admin/organizations", },
      ],
    },
    {
      header: "Configuration",
      suboptions: [
        { icon: <Settings />, label: "Settings", href: "/admin/setting", },
        { icon: <Logs />, label: "Logs", href: "/admin/logs", },
      ],
    },
  ];

  return (
    <div className="w-1/5 h-screen bg-white border-r-2 border-gray-200">
      <div className="h-30 flex justify-center items-center text-3xl">
        .Logo
      </div>
      <div className="relative">
        <div className="grid gap-2 px-4">
          {options.map((option, hIndex) => (
            <div key={option.header} className="grid gap-2">
              <h1 className="text-gray-500 font-medium">{option.header}</h1>
              {option.suboptions.map((opt, subIndex) => (
                <Link
                  key={opt.href}
                  href={opt.href}
                  onClick={() => setActiveIndex({ header: hIndex, sub: subIndex })}
                  className={`
                    relative p-2 duration-300 flex gap-2 font-semibold
                    ${hIndex === activeIndex.header && subIndex === activeIndex.sub
                      ? "text-white bg-blue-500"
                      : "text-black"}`}
                >
                  <span>{opt.icon}</span>
                  <p>{opt.label}</p>
                </Link>
              )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}