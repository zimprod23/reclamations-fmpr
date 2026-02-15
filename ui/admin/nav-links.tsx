"use client";

import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Links for Admin vs Student
const adminLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Manage Demands", href: "/manage", icon: FileText },
];

const studentLinks = [
  { name: "My Demands", href: "/dashboard", icon: LayoutDashboard },
  { name: "New Demand", href: "/submit", icon: PlusCircle },
];

export default function NavLinks({ role }: { role: "ADMIN" | "STUDENT" }) {
  const pathname = usePathname();
  const links = role === "ADMIN" ? adminLinks : studentLinks;

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              { "bg-sky-100 text-blue-600": pathname === link.href },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
