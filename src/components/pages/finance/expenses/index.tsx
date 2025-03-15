import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ExpenseList from "@/components/finance/ExpenseList";

export default function ExpensesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader title="Expenses" />

      <main className="flex-1 p-6">
        <ExpenseList />
      </main>
    </div>
  );
}
