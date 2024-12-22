"use client";
import { cn } from "@/lib/utils";
import { FaBookReader, FaUser } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLinks() {
    const pathname = usePathname();
    const links = [
      {
        href: "/dashboard",
        Icon: FaBookReader,
        text: "dashboard",
      },
      {
        href: "/dashboard/user",
        Icon: FaUser,
        text: "users",
      },
    ];
  
    return (
      <div className="flex items-center gap-6 border-b border-gray-200 pb-3">
        {links.map(({ href, Icon, text }, index) => {
          const isActive = pathname === href;
          return (
            <Link
              href={href}
              className={cn(
                "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all",
                "hover:bg-gray-100 active:bg-gray-200",
                isActive
                  ? "bg-green-50 text-green-600"
                  : "text-gray-600 hover:text-gray-900"
              )}
              key={index}
            >
              <Icon className={cn(
                "h-4 w-4 transition-colors",
                isActive
                  ? "text-green-500"
                  : "text-gray-400 group-hover:text-gray-600"
              )} />
              <span className="capitalize">{text}</span>
            </Link>
          );
        })}
      </div>
    );
  }