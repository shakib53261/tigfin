import { useState } from "react";
import TaskBoard from "@/components/projects/TaskBoard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProjectTasksPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="flex h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 pt-4 pb-2">
              <div className="flex items-center mb-6">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/projects/${id}`)}
                  className="gap-2 mr-4"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Project
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Project Tasks
                </h1>
              </div>

              <TaskBoard
                projectId={id}
                onTaskMove={(taskId, newStatus) => {
                  console.log(`Moving task ${taskId} to ${newStatus}`);
                  // In a real app, you would update the task status in your API
                }}
                onTaskEdit={(taskId) => {
                  console.log(`Editing task ${taskId}`);
                  // In a real app, you would open a modal or navigate to edit the task
                }}
                onTaskDelete={(taskId) => {
                  console.log(`Deleting task ${taskId}`);
                  // In a real app, you would delete the task in your API
                }}
                onAddTask={() => {
                  console.log("Adding new task");
                  // In a real app, you would open a modal to add a new task
                }}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
