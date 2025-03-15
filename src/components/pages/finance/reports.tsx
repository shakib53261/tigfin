import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FinancialReports from "@/components/finance/FinancialReports";

export default function ReportsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader title="Financial Reports" />

      <main className="flex-1 p-6">
        <FinancialReports />
      </main>
    </div>
  );
}
