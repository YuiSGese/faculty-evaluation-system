"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NavItem from "./NavItem";
import navItemList from "./navItemList";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <aside
      className={cn(
        "bg-white border-r border-primary-light/30 flex flex-col transition-all duration-300 overflow-hidden shadow-lg fixed top-0 left-0 h-screen z-50",
        isExpanded ? "w-64" : "w-20",
        className
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setOpenDropdown(null); // Close all dropdowns when sidebar collapses
      }}
    >
      {/* Logo Section */}
      <Link href="/dashboard" className="block">
        <div className="relative h-16 px-4 border-b border-primary-light/30 bg-gradient-to-r from-primary-lightest/30 to-white flex items-center gap-3">
          {/* Logo placeholder - Replace with actual logo path */}
          <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.innerHTML =
                  '<span class="text-white font-bold text-xl">教</span>';
              }}
            />
          </div>

          {/* Text */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
            )}
          >
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent whitespace-nowrap">
              教員評価システム
            </h1>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2 py-4 space-y-1">
        {navItemList.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            isExpanded={isExpanded}
            openDropdown={openDropdown}
            toggleMenu={toggleMenu}
          />
        ))}
      </nav>

      {/* Footer info (optional) */}
      {isExpanded && (
        <div className="border-t border-primary-light/30 p-4">
          <p className="text-xs text-slate-500 text-center">
            © 2024 名古屋芸大
          </p>
        </div>
      )}
    </aside>
  );
}
