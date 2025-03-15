import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import TimeOffManagement from "@/components/hr/TimeOffManagement";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TimeOffPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Time Off Management</h1>
        </DashboardHeader>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <TimeOffManagement />
        </main>
      </div>
    </div>
  );
}
