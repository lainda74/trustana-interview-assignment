"use client";

import { LayoutDashboard, Settings, UserStar } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NavItem } from "@/app/types/ui/sideNav.type";

const navItems: NavItem[] = [
  { href: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { href: "/admin", icon: <UserStar />, label: "Admin" },
  { href: "/settings", icon: <Settings />, label: "Settings" },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside
      className="sticky top-0 h-screen w-20 flex-shrink-0 bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-600 p-4"
    >
      <nav className="h-full">
        <ul className="flex flex-col justify-center items-center h-full gap-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                    {
                      "bg-blue-100 text-blue-600": isActive,
                      "text-white hover:bg-gray-200 hover:text-gray-700":
                        !isActive,
                    }
                  )}
                  aria-label={item.label}
                >
                  {item.icon}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
