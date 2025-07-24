import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
export default function AdminDashboard() {
  const adminAsides = [
    { name: "Dashboard", redirect: "/admin/dashboard" },
    { name: "Requests", redirect: "/admin/management" },
    // { name: "Rooms", redirect: "rooms" },
    { name: "Test Catalog", redirect: "overview" },
    { name: "Editor", redirect: "users" },
  ];
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold text-blue-700">Code Mentor</h1>
        <div className="flex items-center gap-6">
          <UserButton />
        </div>
      </header>
      <div className="flex h-[calc(100vh-64px)]">
        <aside className="w-64 bg-white h-full shadow-md p-6 space-y-4">
          <nav className="flex flex-col gap-4">
            {adminAsides.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  to={item.redirect}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
