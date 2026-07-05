import React, { useEffect, useState } from "react";
import Sidebar from "../components/shared/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";
import { FaBars } from "react-icons/fa";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-70px)] bg-slate-100">
      {/* Mobile Sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 xl:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <Sidebar />
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Sidebar */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:flex xl:w-72 xl:flex-col border-r border-gray-200 bg-white shadow-sm">
        <Sidebar  />
      </div>

      {/* Main Content */}
      <div className="xl:pl-72">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 xl:hidden"
            >
              <FaBars className="text-xl text-slate-700" />
            </button>

            <h1 className="text-2xl font-bold text-slate-800">
              Admin Dashboard
            </h1>
          </div>

          <div className="text-sm text-slate-500">
            Welcome back 👋
          </div>
        </header>

        {/* Content */}
        <main className="p-6 lg:p-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;