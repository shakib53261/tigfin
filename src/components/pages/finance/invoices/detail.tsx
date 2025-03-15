import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InvoiceDetail from "@/components/finance/InvoiceDetail";

export default function InvoiceDetailPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader title="Invoice Details" />

      <main className="flex-1 p-6">
        <InvoiceDetail />
      </main>
    </div>
  );
}
