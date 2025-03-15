import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import EmployeeDirectory from "@/components/hr/EmployeeDirectory";
import TimeOffManagement from "@/components/hr/TimeOffManagement";
import PerformanceReview from "@/components/hr/PerformanceReview";
import DocumentManagement from "@/components/hr/DocumentManagement";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HRPage() {
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
          <h1 className="text-xl font-bold">Human Resources</h1>
        </DashboardHeader>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Tabs defaultValue="employees" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="time-off">Time Off</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="employees" className="mt-0">
              <EmployeeDirectory />
            </TabsContent>
            <TabsContent value="time-off" className="mt-0">
              <TimeOffManagement />
            </TabsContent>
            <TabsContent value="performance" className="mt-0">
              <PerformanceReview />
            </TabsContent>
            <TabsContent value="documents" className="mt-0">
              <DocumentManagement />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
