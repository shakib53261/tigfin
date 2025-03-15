import { useState } from "react";
import ProjectForm from "@/components/projects/ProjectForm";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";

export default function EditProjectPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="flex h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 pt-4 pb-2">
              <ProjectForm isEditing={true} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
