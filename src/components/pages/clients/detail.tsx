import React, { useState } from "react";
import ClientDetail from "@/components/clients/ClientDetail";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";

export default function ClientDetailPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="flex h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 pt-4 pb-2">
              <ClientDetail />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
