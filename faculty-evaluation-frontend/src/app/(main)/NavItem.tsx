"use client";

import { cn } from "@/utils/cn";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Icon as TablerIcon } from "@tabler/icons-react";

interface NavItemProps {
  item: {
    label: string;
    icon: TablerIcon;
    href?: string;
    children?: { label: string; href: string }[];
  };
  isExpanded: boolean;
  openDropdown: string | null;
  toggleMenu: (label: string) => void;
}

function NavItem({ item, isExpanded, openDropdown, toggleMenu }: NavItemProps) {
  const pathname = usePathname();
  const Icon = item.icon;
  const isOpen = openDropdown === item.label;
  const hasChildren = !!item.children?.length;

  const baseClasses =
    "flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-slate-700 hover:bg-primary-lightest hover:text-primary transition-all";

  // Single item without children
  if (!hasChildren && item.href) {
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        className={cn(
          baseClasses,
          isActive &&
            "bg-gradient-to-r from-primary-dark to-primary text-white font-semibold shadow-md"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon size={20} className="shrink-0" />
          <span
            className={cn(
              "text-sm font-medium whitespace-nowrap transition-all duration-300",
              isExpanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2"
            )}
          >
            {item.label}
          </span>
        </div>
      </Link>
    );
  }

  // Parent item with children (Accordion)
  const isActive = item.children?.some((child) =>
    pathname.startsWith(child.href.split("/").slice(0, 3).join("/"))
  );

  return (
    <div className="space-y-1">
      <button
        onClick={() => toggleMenu(item.label)}
        className={cn(
          baseClasses,
          (isOpen || isActive) &&
            "bg-gradient-to-r from-primary-dark to-primary text-white font-semibold shadow-md"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon size={20} className="shrink-0" />
          <span
            className={cn(
              "text-sm font-medium whitespace-nowrap transition-all duration-300",
              isExpanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2"
            )}
          >
            {item.label}
          </span>
        </div>

        {isExpanded && (
          <IconChevronDown
            size={16}
            className={cn(
              "transition-transform duration-300 shrink-0",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>

      {/* Children list */}
      {hasChildren && isOpen && isExpanded && (
        <div
          className={cn(
            "pl-8 space-y-1 overflow-hidden transition-[max-height] duration-300 ease-in-out",
            isOpen ? "max-h-[500px]" : "max-h-0"
          )}
        >
          {item.children?.map((sub) => {
            const isChildActive = pathname === sub.href;

            return (
              <Link
                key={sub.label}
                href={sub.href}
                className={cn(
                  "block px-3 py-2 text-sm rounded-lg transition-all",
                  isChildActive
                    ? "text-primary font-semibold bg-primary-light/30 border-l-2 border-primary"
                    : "text-text-secondary hover:bg-primary-lightest hover:text-primary"
                )}
              >
                {sub.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default NavItem;
