"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Package, ShoppingCart, LogOut } from "lucide-react";

const links = [
  { href: "/admin/dashboard/users", label: "Users", icon: Users },
  { href: "/admin/dashboard/products", label: "Products", icon: Package },
  { href: "/admin/dashboard/orders", label: "Orders", icon: ShoppingCart },
];

const Sidebar = () => {
  const pathname = usePathname();
  const normalizePath = (path: string) => path.replace(/\/$/, "");

  const handleLogout = () => {
    fetch("/api/auth/logout", { method: "POST" })
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => console.error("Logout failed:", error));
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <aside className="hidden sm:flex sm:flex-col w-64 min-h-screen bg-gray-800 text-white shadow-lg p-6">
        <ul className="space-y-6 flex-grow">
          {links.map(({ href, label, icon: Icon }) => (
            <li
              key={href}
              className={`p-3 rounded-md transition-all duration-200 ${
                normalizePath(pathname) === href
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <Link href={href} className="flex items-center gap-3 text-lg">
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white mt-6 p-3 rounded-md w-full"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Bottom navigation for small screens */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around py-2 shadow-[0_-2px_4px_rgba(0,0,0,0.2)]">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center text-xs ${
              normalizePath(pathname) === href
                ? "text-blue-400"
                : "text-gray-300"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-xs text-gray-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
