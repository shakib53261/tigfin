import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpDown,
  Eye,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  status: "approved" | "pending" | "rejected";
  submittedBy: string;
  notes?: string;
}

const mockPendingExpenses: Expense[] = [
  {
    id: "EXP-003",
    description: "Software Subscription",
    amount: 99.99,
    date: "2023-05-20",
    category: "Software",
    status: "pending",
    submittedBy: "John Doe",
    notes: "Monthly subscription for project management software",
  },
  {
    id: "EXP-004",
    description: "Travel Expenses",
    amount: 450.0,
    date: "2023-05-18",
    category: "Travel",
    status: "pending",
    submittedBy: "Jane Smith",
    notes: "Client meeting in New York",
  },
  {
    id: "EXP-006",
    description: "Conference Registration",
    amount: 899.0,
    date: "2023-05-25",
    category: "Professional Development",
    status: "pending",
    submittedBy: "Mike Johnson",
  },
  {
    id: "EXP-007",
    description: "Team Lunch",
    amount: 215.75,
    date: "2023-05-22",
    category: "Meals",
    status: "pending",
    submittedBy: "Sarah Williams",
    notes: "Monthly team lunch",
  },
];

const mockRecentlyApproved: Expense[] = [
  {
    id: "EXP-001",
    description: "Office Supplies",
    amount: 250.75,
    date: "2023-05-10",
    category: "Supplies",
    status: "approved",
    submittedBy: "John Doe",
  },
  {
    id: "EXP-002",
    description: "Client Lunch Meeting",
    amount: 120.5,
    date: "2023-05-15",
    category: "Meals",
    status: "approved",
    submittedBy: "Jane Smith",
    notes: "Meeting with Acme Corp",
  },
];

const mockRecentlyRejected: Expense[] = [
  {
    id: "EXP-005",
    description: "Hardware Purchase",
    amount: 1200.0,
    date: "2023-05-05",
    category: "Equipment",
    status: "rejected",
    submittedBy: "Mike Johnson",
    notes: "Not in current quarter budget",
  },
];

export default function ExpenseApproval() {
  const [pendingExpenses, setPendingExpenses] =
    useState<Expense[]>(mockPendingExpenses);
  const [approvedExpenses] = useState<Expense[]>(mockRecentlyApproved);
  const [rejectedExpenses] = useState<Expense[]>(mockRecentlyRejected);
  const navigate = useNavigate();

  const handleApprove = (expenseId: string) => {
    setPendingExpenses(
      pendingExpenses.filter((expense) => expense.id !== expenseId),
    );
    // In a real app, you would update the expense status in the database
  };

  const handleReject = (expenseId: string) => {
    setPendingExpenses(
      pendingExpenses.filter((expense) => expense.id !== expenseId),
    );
    // In a real app, you would update the expense status in the database
  };

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

  const renderExpenseTable = (expenses: Expense[]) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-sm text-gray-500">
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center">
                ID
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center">
                Description
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center">
                Amount
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center">
                Date
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center">
                Category
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center">
                Submitted By
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center">
                Status
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-sm">{expense.id}</td>
              <td className="py-3 px-4 text-sm">{expense.description}</td>
              <td className="py-3 px-4 text-sm">
                ${expense.amount.toFixed(2)}
              </td>
              <td className="py-3 px-4 text-sm">{expense.date}</td>
              <td className="py-3 px-4 text-sm">{expense.category}</td>
              <td className="py-3 px-4 text-sm">{expense.submittedBy}</td>
              <td className="py-3 px-4 text-sm">
                <Badge className={getStatusColor(expense.status)}>
                  {expense.status.charAt(0).toUpperCase() +
                    expense.status.slice(1)}
                </Badge>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/finance/expenses/${expense.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {expense.status === "pending" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        onClick={() => handleApprove(expense.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        onClick={() => handleReject(expense.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-gray-800">
            Expense Approval
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className="bg-yellow-100 text-yellow-800">
              {pendingExpenses.length} Pending
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              {approvedExpenses.length} Approved
            </Badge>
            <Badge className="bg-red-100 text-red-800">
              {rejectedExpenses.length} Rejected
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="pending" className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Pending Approval ({pendingExpenses.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Recently Approved ({approvedExpenses.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center">
              <XCircle className="h-4 w-4 mr-2" />
              Recently Rejected ({rejectedExpenses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pendingExpenses.length > 0 ? (
              renderExpenseTable(pendingExpenses)
            ) : (
              <div className="text-center py-8 text-gray-500">
                No pending expenses to approve
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved">
            {approvedExpenses.length > 0 ? (
              renderExpenseTable(approvedExpenses)
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recently approved expenses
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected">
            {rejectedExpenses.length > 0 ? (
              renderExpenseTable(rejectedExpenses)
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recently rejected expenses
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
