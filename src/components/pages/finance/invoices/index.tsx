import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InvoiceList from "@/components/finance/InvoiceList";

export default function InvoicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader title="Invoices" />

      <main className="flex-1 p-6">
        <InvoiceList />
      </main>
    </div>
  );
}
