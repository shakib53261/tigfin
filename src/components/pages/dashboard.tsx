import React, { useState, useEffect } from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import Sidebar from "../dashboard/Sidebar";
import DashboardGrid from "../dashboard/DashboardGrid";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "../../../supabase/auth";

export default function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to trigger loading state for demonstration
  const handleRefresh = () => {
    setLoading(true);
    // Reset loading after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="flex h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-6 pt-4 pb-2 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back,{" "}
                  {user?.user_metadata?.full_name ||
                    user?.email?.split("@")[0] ||
                    "User"}
                  !
                </h1>
                <p className="text-gray-600">
                  Here's what's happening with your business today.
                </p>
              </div>
              <Button
                onClick={handleRefresh}
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-4 h-9 shadow-sm transition-colors flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Loading..." : "Refresh Dashboard"}
              </Button>
            </div>
            <div
              className={cn(
                "container mx-auto p-6",
                "transition-all duration-300 ease-in-out",
              )}
            >
              <DashboardGrid isLoading={loading} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
