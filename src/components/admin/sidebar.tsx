"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LayoutDashboardIcon, ArchiveIcon, LucideUsersRound, Building2Icon, Package2, Settings } from "lucide-react";

export const Sidebar = () => {

  const pathname = usePathname();
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const options = [
    { icon: <LayoutDashboardIcon />, label: "Dashboard", href: "/admin", },
    { icon: <ArchiveIcon/>, label: "Inventory", href: "/admin/inventory", },
    { icon: <Package2 />, label: "Orders", href: "/admin/orders", },
    { icon: <LucideUsersRound />, label: "Users", href: "/admin/users", },
    { icon: <Building2Icon />, label: "Organizations", href: "/admin/organizations", },
    { icon: <Settings />, label: "Setting", href: "/admin/setting", },
  ];

  useEffect(() => {
    const index = options.findIndex((option) => option.href === pathname);
    const target = itemRefs.current[index];
    if (target) {
      setIndicatorTop(target.offsetTop);
      setActiveIndex(index);
    }
  }, [pathname]);

  return (
    <div className="w-1/5 h-screen bg-white border-r-2 border-gray-200">
      <div className="h-30 flex justify-center items-center text-3xl">
        .Logo
      </div>
      <div className="relative">
        <div
          className="absolute left-4 right-4 h-10 bg-blue-600 rounded transition-all duration-300 ease-in-out"
          style={{ top: `${indicatorTop}px` }}
        />
        <div className="grid gap-2 px-4">
          {options.map((option, index) => (
            <Link
              key={option.href}
              href={option.href}
              onClick={() => setActiveIndex(index)}
              className={`
                relative p-2 duration-300 flex gap-2 font-semibold delay-200
                ${index === activeIndex ? "text-white" : "text-black"}`}
              ref={(el) => { itemRefs.current[index] = el }}
            >
              <span>{option.icon}</span>
              <p>{option.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}