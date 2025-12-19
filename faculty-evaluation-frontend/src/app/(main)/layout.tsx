"use client";

import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lightest/30 via-white to-primary-lightest/20 flex">
      {/* Sidebar - Fixed position, expands on hover */}
      <Sidebar />

      {/* Main content area - Always accounts for collapsed sidebar width */}
      <div className="flex-1 flex flex-col min-h-screen ml-20 transition-all duration-300">
        {/* Header - Sticky at top */}
        <Header />

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
