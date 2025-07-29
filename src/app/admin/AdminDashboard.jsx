import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
export default function AdminDashboard() {
  const adminAsides = [
    { name: "Dashboard", redirect: "/admin/dashboard" },
    { name: "Requests", redirect: "/admin/management" },
    // { name: "Rooms", redirect: "rooms" },
    { name: "Test Catalog", redirect: "overview" },
    { name: "Users", redirect: "users" },
  ];
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="text-xl font-semibold text-blue-600">CodeMentor</div>
          <span className="text-sm text-gray-500 hidden sm:inline-block">
            | Admin Panel
          </span>
        </div>
        <div className="flex items-center gap-3">
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
