import { useState } from "react";
import ProjectList from "@/components/projects/ProjectList";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";

export default function ProjectsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="flex h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 pt-4 pb-2">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Projects
              </h1>
              <ProjectList />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
