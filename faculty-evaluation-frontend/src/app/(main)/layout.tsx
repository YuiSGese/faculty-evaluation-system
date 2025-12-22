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
      <div className="flex-1 flex flex-col h-screen ml-20 transition-all duration-300 overflow-hidden">
        {/* Header - Sticky at top */}
        <Header />

        {/* Page content */}
        <main className="flex-1 px-4 md:px-6 pb-4 md:pb-6 pt-0 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
