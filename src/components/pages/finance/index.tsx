import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InvoiceList from "@/components/finance/InvoiceList";
import ExpenseList from "@/components/finance/ExpenseList";
import FinancialReports from "@/components/finance/FinancialReports";

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("invoices");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader title="Finance" />

      <main className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="mt-0">
            <InvoiceList />
          </TabsContent>

          <TabsContent value="expenses" className="mt-0">
            <ExpenseList />
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <FinancialReports />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
