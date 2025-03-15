import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ExpenseDetail from "@/components/finance/ExpenseDetail";

export default function ExpenseDetailPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader title="Expense Details" />

      <main className="flex-1 p-6">
        <ExpenseDetail />
      </main>
    </div>
  );
}
