"use client";

import Link from "next/link";
import { Users, Package, ShoppingCart } from "lucide-react";

const cards = [
  { href: "/admin/dashboard/users", label: "Manage Users", icon: Users },
  { href: "/admin/dashboard/products", label: "Manage Products", icon: Package },
  { href: "/admin/dashboard/orders", label: "Manage Orders", icon: ShoppingCart },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-8">Welcome, Admin</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
          >
            <span className="text-lg font-semibold">{label}</span>
            <Icon className="w-8 h-8 text-blue-500" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
