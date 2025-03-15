import ExpenseApproval from "@/components/finance/ExpenseApproval";

export default function ExpenseApprovalPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Expense Approval
      </h1>
      <ExpenseApproval />
    </div>
  );
}
