'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminSecret: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      router.push("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring focus:ring-blue-400 dark:focus:ring-blue-600 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring focus:ring-blue-400 dark:focus:ring-blue-600 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring focus:ring-blue-400 dark:focus:ring-blue-600 outline-none"
          />
          <input
            type="text"
            name="adminSecret"
            placeholder="Admin Secret (optional)"
            value={formData.adminSecret}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring focus:ring-blue-400 dark:focus:ring-blue-600 outline-none"
          />
        </div>
        <button
          onClick={handleRegister}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:outline-none"
        >
          Register
        </button>
        <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
