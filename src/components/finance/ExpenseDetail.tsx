import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Edit, CheckCircle, XCircle } from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  status: "approved" | "pending" | "rejected";
  submittedBy: string;
  notes: string;
  receiptUrl?: string;
}

const mockExpenses: Record<string, Expense> = {
  "EXP-001": {
    id: "EXP-001",
    description: "Office Supplies",
    amount: 250.75,
    date: "2023-05-10",
    category: "Supplies",
    status: "approved",
    submittedBy: "John Doe",
    notes: "Purchased notebooks, pens, and other office supplies for the team.",
    receiptUrl: "https://example.com/receipt-001.pdf",
  },
  "EXP-002": {
    id: "EXP-002",
    description: "Client Lunch Meeting",
    amount: 120.5,
    date: "2023-05-15",
    category: "Meals",
    status: "approved",
    submittedBy: "Jane Smith",
    notes:
      "Lunch meeting with potential client to discuss project requirements.",
    receiptUrl: "https://example.com/receipt-002.pdf",
  },
  "EXP-003": {
    id: "EXP-003",
    description: "Software Subscription",
    amount: 99.99,
    date: "2023-05-20",
    category: "Software",
    status: "pending",
    submittedBy: "Mike Johnson",
    notes: "Monthly subscription for design software used by the design team.",
  },
  "EXP-004": {
    id: "EXP-004",
    description: "Travel Expenses",
    amount: 450.0,
    date: "2023-05-18",
    category: "Travel",
    status: "pending",
    submittedBy: "Sarah Williams",
    notes: "Flight and hotel expenses for client meeting in New York.",
    receiptUrl: "https://example.com/receipt-004.pdf",
  },
  "EXP-005": {
    id: "EXP-005",
    description: "Hardware Purchase",
    amount: 1200.0,
    date: "2023-05-05",
    category: "Equipment",
    status: "rejected",
    submittedBy: "Robert Brown",
    notes:
      "New laptop for development team. Rejected due to budget constraints.",
  },
};

export default function ExpenseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // In a real app, you would fetch this data from your API
  const expense = id ? mockExpenses[id] : null;

  if (!expense) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Expense Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The expense you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={() => navigate("/finance/expenses")}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Expenses
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleApprove = () => {
    setIsProcessing(true);
    // In a real app, you would make an API call here
    setTimeout(() => {
      setIsProcessing(false);
      // Update the expense status
      // For now we'll just navigate back
      navigate("/finance/expenses");
    }, 1000);
  };

  const handleReject = () => {
    setIsProcessing(true);
    // In a real app, you would make an API call here
    setTimeout(() => {
      setIsProcessing(false);
      // Update the expense status
      // For now we'll just navigate back
      navigate("/finance/expenses");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => navigate("/finance/expenses")}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Expenses
        </Button>

        <div className="flex space-x-2">
          {expense.status === "pending" && (
            <>
              <Button
                onClick={handleApprove}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" /> Approve
                  </>
                )}
              </Button>

              <Button
                onClick={handleReject}
                disabled={isProcessing}
                className="bg-red-600 hover:bg-red-700"
              >
                {isProcessing ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-2" /> Reject
                  </>
                )}
              </Button>
            </>
          )}

          {expense.receiptUrl && (
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" /> Download Receipt
            </Button>
          )}

          <Button
            onClick={() => navigate(`/finance/expenses/${id}/edit`)}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
        </div>
      </div>

      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">
                Expense {expense.id}
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Submitted on {expense.date}
              </p>
            </div>
            <Badge className={getStatusColor(expense.status)}>
              {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Description
                </h3>
                <p className="text-sm text-gray-900">{expense.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Amount
                </h3>
                <p className="text-lg font-bold text-orange-600">
                  ${expense.amount.toFixed(2)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Category
                </h3>
                <p className="text-sm text-gray-900">{expense.category}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Submitted By
                </h3>
                <p className="text-sm text-gray-900">{expense.submittedBy}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                <p className="text-sm text-gray-900">{expense.date}</p>
              </div>

              {expense.receiptUrl && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Receipt
                  </h3>
                  <div className="mt-2">
                    <div className="h-32 w-full bg-gray-100 rounded-md flex items-center justify-center">
                      <p className="text-sm text-gray-500">Receipt preview</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
            <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
              {expense.notes}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
